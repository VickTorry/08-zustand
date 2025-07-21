import css from "./page.module.css";

export const metadata = {
  title: '404 - Page not found',
  description: 'The page you are looking for does not exist.',
  openGraph: {
      title: `404 - Page not found`,
      description: `The page you are looking for does not exist.`,
      url: `https://08-zustand-n30sidmvv-victorias-projects-85edeb20.vercel.app/404`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://illustrations.popsy.co/white/404-error.svg',
          width: 1200,
          height: 630,
          alt: '404 - Page not found',
        },
      ],
      type: 'website',
    },
};

const NotFound = () => {
  return <div><h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p></div>;
};

export default NotFound;