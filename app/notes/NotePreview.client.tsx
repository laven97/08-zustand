"use client";

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./filter/[...slug]/NotesPage.module.css";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading)
    return (
      <Modal onClose={() => router.back}>
        <p>loading...</p>
      </Modal>
    );

  if (isError || !note)
    return (
      <Modal onClose={() => router.back}>
        <p>error...</p>
      </Modal>
    );

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.previewModal}>
        <h2>{note.title}</h2>
        <p>
          <b>Tag:</b> {note.tag}
        </p>
        <p>{note.content}</p>
        <p style={{ fontSize: 12, color: "#888" }}>Created: {note.createdAt}</p>
      </div>
    </Modal>
  );
}
