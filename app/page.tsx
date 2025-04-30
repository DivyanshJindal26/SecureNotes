"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { PlusIcon, LogOutIcon } from "lucide-react"
import NotesList from "@/components/notes-list"
import CreateNoteDialog from "@/components/create-note-dialog"
import type { INote } from "@/lib/models/note"

export default function HomePage() {
  const [notes, setNotes] = useState<INote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const fetchNotes = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/notes")
      if (response.ok) {
        const data = await response.json()
        setNotes(data)
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleNoteCreated = () => {
    setIsDialogOpen(false)
    fetchNotes()
  }

  const handleDeleteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchNotes()
      }
    } catch (error) {
      console.error("Failed to delete note:", error)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <header className="p-6 flex justify-between items-center border-b border-gray-700">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Secure Notes
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              New Note
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <NotesList notes={notes} onDelete={handleDeleteNote} />
          )}
        </main>

        <CreateNoteDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onNoteCreated={handleNoteCreated}
        />
      </div>
    </ProtectedRoute>
  )
}
