export type NoteId = string;

export type Note = {
  id: NoteId;
  title: string;
  content: string;
  createdAt: number; // epoch ms
};

