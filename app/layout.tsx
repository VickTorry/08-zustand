import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export const metadata: Metadata = {
  title: "Your Note App",
  description: "A simple note-taking app built with Next.js",
  openGraph: {
      title: `Your Note App`,
      description: `A simple note-taking app built with Next.js`,
      url: `https://08-zustand-six-tau.vercel.app/`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Your Note App',
        },
      ],
      type: 'website',
    },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider> <Header />
          <main>{children}{modal}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
