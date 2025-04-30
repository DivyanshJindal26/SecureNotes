import { connectToDatabase } from "@/lib/db"
import Note from "@/lib/models/note"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const note = await Note.findById(params.id)

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const note = await Note.findByIdAndDelete(params.id)

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Note deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { title, content, language } = await request.json()

    if (!title || !content || !language) {
      return NextResponse.json({ error: "Title, content, and language are required" }, { status: 400 })
    }

    await connectToDatabase()
    const note = await Note.findByIdAndUpdate(params.id, { title, content, language }, { new: true })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
  }
}
