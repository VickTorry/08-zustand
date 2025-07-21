// app/notes/action/create/page.tsx
import css from './page.module.css';

import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata = {
  title: 'Create Note',
  description: 'Use this form to create a new note with title, content, and tag.',
  openGraph: {
    title: 'Create Note',
    description: 'Use this form to create a new note with title, content, and tag.',
    url: 'https://08-zustand-six-tau.vercel.app/notes/action/create',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note Page',
      },
    ],
    type: 'website',
  },
};


const CreateNote = async () => {


  return (
    <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm />
  </div>
</main>

  );
};

export default CreateNote;
