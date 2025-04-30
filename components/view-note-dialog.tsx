"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { INote } from "@/lib/models/note"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface ViewNoteDialogProps {
  note: INote
  isOpen: boolean
  onClose: () => void
}

export default function ViewNoteDialog({ note, isOpen, onClose }: ViewNoteDialogProps) {
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

  // Map our language values to syntax highlighter language values
  const getSyntaxLanguage = (language: string) => {
    const languageMap: Record<string, string> = {
      javascript: "javascript",
      typescript: "typescript",
      python: "python",
      cpp: "cpp",
      java: "java",
      csharp: "csharp",
      html: "html",
      css: "css",
      plaintext: "text",
    }

    return languageMap[language] || "text"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700 text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <DialogTitle className="text-xl font-bold">{note.title}</DialogTitle>
            <div className="text-sm text-gray-400 mt-1">Created: {new Date(note.createdAt).toLocaleString()}</div>
          </div>
          <Badge className={`${getLanguageColor(note.language)} text-white`}>{note.language}</Badge>
        </DialogHeader>

        <div className="py-4 rounded-md overflow-hidden">
          {note.language === "plaintext" ? (
            <div className="whitespace-pre-wrap bg-gray-900 p-4 rounded-md">{note.content}</div>
          ) : (
            <SyntaxHighlighter
              language={getSyntaxLanguage(note.language)}
              style={vscDarkPlus}
              customStyle={{ margin: 0, borderRadius: "0.375rem" }}
            >
              {note.content}
            </SyntaxHighlighter>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
