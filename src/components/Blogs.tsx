//import React from 'react';
import { useMediumPosts } from './useMediumPosts';

const MediumSection = ({ username }: { username: string }) => {
  const { posts, loading, error } = useMediumPosts(username);

  if (loading) return <div className="text-white text-center p-10 animate-pulse">Loading updates...</div>;
  if (error) return null;

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
       <h2 className="text-4xl font-light text-white mb-10 border-b border-white/10 pb-4">
        Latest <span className="font-semibold text-blue-400">Writes</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <a
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:bg-white/10"
          >
            {/* 1. IMAGE SECTION */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay to blend image with card slightly */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
            </div>

            {/* 2. TEXT SECTION (Glassmorphic) */}
            <div className="flex flex-1 flex-col p-6 backdrop-blur-sm">
              {/* Category */}
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 border border-blue-500/20">
                  {post.categories[0] || 'Article'}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(post.pubDate).toLocaleDateString()}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-bold text-white leading-tight group-hover:text-blue-300 transition-colors">
                {post.title}
              </h3>

              {/* Description Snippet */}
              <p className="mb-4 text-sm text-gray-400 line-clamp-3">
                {post.short_description}
              </p>

              {/* Read More Link */}
              <div className="mt-auto flex items-center text-sm font-medium text-white opacity-60 transition-opacity group-hover:opacity-100">
                Read full article 
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MediumSection;