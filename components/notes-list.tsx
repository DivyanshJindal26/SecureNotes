"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2Icon, Edit2Icon, EyeIcon } from "lucide-react"
import type { INote } from "@/lib/models/note"
import ViewNoteDialog from "./view-note-dialog"
import EditNoteDialog from "./edit-note-dialog"

interface NotesListProps {
  notes: INote[]
  onDelete: (id: string) => void
}

export default function NotesList({ notes, onDelete }: NotesListProps) {
  const [viewingNote, setViewingNote] = useState<INote | null>(null)
  const [editingNote, setEditingNote] = useState<INote | null>(null)

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      javascript: "bg-yellow-500",
      typescript: "bg-blue-500",
      python: "bg-green-500",
      cpp: "bg-purple-500",
      java: "bg-orange-500",
      csharp: "bg-pink-500",
      html: "bg-red-500",
      css: "bg-cyan-500",
      plaintext: "bg-gray-500",
    }

    return colors[language] || "bg-gray-500"
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">No notes yet</h2>
        <p className="text-gray-400">Create your first note to get started</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card
            key={note._id}
            className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold truncate">{note.title}</CardTitle>
                <Badge className={`${getLanguageColor(note.language)} text-white`}>{note.language}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-gray-300 line-clamp-3 h-18">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 border-t border-gray-700">
              <div className="text-xs text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewingNote(note)}
                  className="text-gray-400 hover:text-white"
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingNote(note)}
                  className="text-gray-400 hover:text-white"
                >
                  <Edit2Icon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(note._id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {viewingNote && <ViewNoteDialog note={viewingNote} isOpen={!!viewingNote} onClose={() => setViewingNote(null)} />}

      {editingNote && (
        <EditNoteDialog
          note={editingNote}
          isOpen={!!editingNote}
          onClose={() => setEditingNote(null)}
          onNoteUpdated={() => {
            setEditingNote(null)
            // Refresh notes list
            window.location.reload()
          }}
        />
      )}
    </>
  )
}
