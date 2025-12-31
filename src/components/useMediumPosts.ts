import { useState, useEffect } from 'react';

// 1. Interface for the FINAL processed post (what our component uses)
export interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
  categories: string[];
  short_description: string;
}

// 2. Interface for the RAW item from the API (Fixes "Unexpected any")
interface RssItem {
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
  categories: string[];
  description: string; // The raw HTML content
}

export const useMediumPosts = (username: string) => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
        );
        const data = await res.json();

        if (data.status === 'ok') {
          // Fix: Typed 'item' as RssItem instead of 'any'
          const processedPosts = data.items.map((item: RssItem) => {
            // 1. Extract Image
            let image = item.thumbnail;
            if (!image) {
              const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch) image = imgMatch[1];
            }
            // Fallback
            if (!image) image = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";

            // 2. Extract Text
            const textContent = item.description.replace(/<[^>]+>/g, '');
            const snippet = textContent.substring(0, 100) + '...';

            return {
              title: item.title,
              pubDate: item.pubDate,
              link: item.link,
              categories: item.categories,
              thumbnail: image,
              short_description: snippet,
            };
          });

          setPosts(processedPosts);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (err) {
        // Fix: Log the error so 'err' is considered "used"
        console.error("Error fetching Medium posts:", err);
        setError('Error connecting to Medium');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username]);

  return { posts, loading, error };
};