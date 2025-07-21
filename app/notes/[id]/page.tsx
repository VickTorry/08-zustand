import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import NoteDetailsClient from './NoteDetails.client' 



type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const noteId = Number(id);

  try {
    const note = await fetchNoteById(noteId);

    if (!note) {
      throw new Error('Note not found');
    }

    const preview = note.content.slice(0, 30);

    return {
      title: `Note: ${note.title}`,
      description: preview,
      openGraph: {
        title: `Note: ${note.title}`,
        description: preview,
        url: `https://08-zustand.vercel.app/notes/${noteId}`,
        siteName: 'NoteHub',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'Notes Page',
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Note: ${note.title}`,
        description: preview,
        image: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    };
  } catch (error) {
    console.error('Metadata error for note ID:', noteId, error);

    return {
      title: 'Note Not Found — NoteHub',
      description: 'This note could not be loaded.',
      openGraph: {
        title: 'Note Not Found — NoteHub',
        description: 'This note could not be loaded.',
        url: `https://08-zustand.vercel.app/notes/${noteId}`,
        siteName: 'NoteHub',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            alt: 'Fallback Note',
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Note Not Found — NoteHub',
        description: 'This note could not be loaded.',
        image: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    };
  }
}


export default async function NoteDetails({ params }: Props) {

  const { id } = await params  // ✅ Await here to match what Turbopack expects
  console.log('note id:', id);
  const noteId = Number(id)
  const note = await fetchNoteById(noteId)
  console.log('Fetched note:', note) // ✅ Log the fetched note
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  )
}
