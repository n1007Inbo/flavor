import { Suspense } from 'react';
import HomeContainer from '@/components/HomeContainer';
import { getPosts, getCategories } from '@/lib/wordpress';

// ISR: Serve cached homepage instantly from Vercel Edge, rebuild in background every 5 minutes (300 seconds)
export const revalidate = 300;

export default async function Home() {
  // Fetch all posts to allow fluid client-side filters (Cuisines, Difficulty, Meal Type, Categories)
  const posts = await getPosts(null);
  const categories = await getCategories();

  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', fontFamily: 'var(--font-sans)', color: 'hsl(var(--color-primary))', fontSize: '1.2rem', fontWeight: '600' }}>
        Loading FlavorZing recipes...
      </div>
    }>
      <HomeContainer 
        initialPosts={posts} 
        categories={categories} 
      />
    </Suspense>
  );
}
