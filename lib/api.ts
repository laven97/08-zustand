import { Note, NoteTags } from "@/types/note";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

interface Answer {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  tag: NoteTags,
  search: string,
  page: number
): Promise<Answer> {
  const params: Record<string, any> = {search, page, perPage: 12 };
  if (tag && tag !== "all") params.tag = tag;
  if (search) params.search = search;

  const res = await api.get<Answer>("/notes", { params });
  return res.data;
}

export async function createNote(
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post("/notes", note);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return res.data;
}
