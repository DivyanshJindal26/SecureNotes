import { connectToDatabase } from "@/lib/db"
import Note from "@/lib/models/note"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()
    const notes = await Note.find({}).sort({ createdAt: -1 })
    return NextResponse.json(notes)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, language } = await request.json()

    if (!title || !content || !language) {
      return NextResponse.json({ error: "Title, content, and language are required" }, { status: 400 })
    }

    await connectToDatabase()
    const note = await Note.create({ title, content, language })
    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
  }
}
