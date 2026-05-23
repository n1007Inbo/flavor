import { Suspense } from 'react';
import HomeContainer from '@/components/HomeContainer';
import { getPosts, getCategories } from '@/lib/wordpress';

export default async function Home({ searchParams }) {
  const category = searchParams?.category || null;
  const posts = await getPosts(category);
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
