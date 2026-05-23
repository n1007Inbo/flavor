const { getPosts } = require('./src/lib/wordpress.js');

async function test() {
  try {
    const posts = await getPosts();
    console.log("Total posts fetched:", posts.length);
    console.log("First 3 posts:");
    posts.slice(0, 3).forEach(p => {
      console.log(`ID: ${p.id}, Slug: "${p.slug}", Title: "${p.title}"`);
    });
  } catch (e) {
    console.error("Test failed:", e);
  }
}

test();
