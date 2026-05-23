import Link from 'next/link';
import { getPostBySlug, getPosts } from '@/lib/wordpress';
import RecipeDetailContainer from '@/components/RecipeDetailContainer';
import styles from './page.module.css';

// Enable dynamic routing fallback so that new or older posts build on-demand instantly
export const dynamicParams = true;

// Pre-generate static paths (empty array enforces on-demand generation to prevent remote WordPress rate-limiting timeouts)
export async function generateStaticParams() {
  return [];
}

// Generate dynamic metadata for search engine optimization
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Recipe Not Found | Culinary Elegance',
    };
  }

  return {
    title: `${post.title} | Culinary Elegance`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Culinary Elegance`,
      description: post.excerpt,
      images: [{ url: post.featuredImage }],
    },
  };
}

export default async function Post({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className={`container ${styles.errorContainer}`}>
        <h1 className={styles.errorTitle}>Recipe Not Found</h1>
        <p className={styles.errorText}>We couldn't find the baking recipe or sweet article you were looking for.</p>
        <Link href="/" className="btn-primary">Return to Home</Link>
      </div>
    );
  }

  // Fetch related posts from dynamic listings safey
  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className={styles.article}>
      <RecipeDetailContainer post={post} relatedPosts={relatedPosts} />
    </article>
  );
}
