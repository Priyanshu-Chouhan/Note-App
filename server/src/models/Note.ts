import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  user: mongoose.Types.ObjectId;
  title?: string;
  content: string;
}

const NoteSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<INote>('Note', NoteSchema);