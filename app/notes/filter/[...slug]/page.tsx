// ✅ app/notes/filter/[...slug]/page.tsx

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';


type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'All';
  const title = tag === 'All' ? 'All Notes' : `Notes tagged with ${tag}`;

  return {
    title,
    description: `Browse notes ${tag === 'All' ? '' : `tagged as ${tag}`}`,
    openGraph: {
      title,
      description: `Browse notes ${tag === 'All' ? '' : `tagged as ${tag}`}`,
      url: `https://08-zustand-six-tau.vercel.app/notes/filter/${tag}`,
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
  };
}


export default async function NotesPage({ params }: Props) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] === 'All' ? undefined : resolvedParams.slug?.[0];
  const initialSearch = '';
    const initialData = await fetchNotes(1, 12, initialSearch, tag); // ← SSR

  return <NotesClient tag={tag} initialSearch={initialSearch} initialData={initialData} />;
}
