import mongoose, { Schema, type Document } from "mongoose"

export interface INote extends Document {
  title: string
  content: string
  language: string
  createdAt: Date
  updatedAt: Date
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    language: {
      type: String,
      required: true,
      enum: ["plaintext", "javascript", "typescript", "python", "cpp", "java", "csharp", "html", "css"],
    },
  },
  { timestamps: true },
)

export default mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema)
