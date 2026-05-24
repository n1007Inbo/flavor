import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCategories } from '@/lib/wordpress';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: 'FlavorZing | The Art & Science of Culinary Pairings',
  description: 'Uncover hidden flavor profiles, interactive spice sciences, artisanal baking guides, and gourmet recipe discoveries in our headless WordPress culinary journal.',
  keywords: 'flavor pairing, culinary science, recipe blog, headless wordpress, nextjs gastronomy, spices, gourmet, baking',
  authors: [{ name: 'FlavorZing Editorial' }],
  openGraph: {
    title: 'FlavorZing | The Art & Science of Culinary Pairings',
    description: 'Uncover hidden flavor profiles, interactive spice sciences, artisanal baking guides, and gourmet recipe discoveries.',
    url: 'https://flavorzing.com',
    siteName: 'FlavorZing',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({ children }) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body id="flavorzing-body">
        <Navbar categories={categories} />
        <main style={{ flexGrow: 1, paddingTop: '100px', zIndex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-F1C9E79E66" />
    </html>
  );
}
