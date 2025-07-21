import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import NoteDetailsClient from './NoteDetails.client' 



type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const noteId = Number(id)
  const note = await fetchNoteById(noteId)
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: `${note.content.slice(0, 30)}`,
      url: `https://08-zustand-six-tau.vercel.app/notes/${noteId}`,
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
