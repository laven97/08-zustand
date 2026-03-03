import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { Metadata } from "next";
import { title } from "process";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notes = fetchNoteById(id);

  return {
    title: "Note by ID",
    description: "Getting the note by id",
    openGraph: {
      title: "Note by ID",
      description: "Getting the note by id",
      url: `http://localhost:3000/notes/${notes}`,
      images: [
        {
          url: "https://placehold.co/1200x630",
          width: 1200,
          height: 630,
          alt: "Note",
        },
      ],
      type: "article",
    },
  };
}

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailClient />
    </HydrationBoundary>
  );
}
