import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '../../components/ui';
import {
  Search01Icon,
  FavouriteIcon,
  Message01Icon,
  Share08Icon,
  BookmarkAdd01Icon,
  SparklesIcon,
  MoreVerticalIcon
} from 'hugeicons-react';

interface Post {
  id: number;
  creator: {
    username: string;
    avatar: string;
  };
  image: string;
  tool: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: 1,
    creator: { username: 'sarah_creates', avatar: '👩‍🎨' },
    image: '🎨',
    tool: 'Face Swap',
    timestamp: '2h',
    likes: 234,
    comments: 12,
    isLiked: false,
  },
  {
    id: 2,
    creator: { username: 'john_ai', avatar: '👨‍💼' },
    image: '🌅',
    tool: 'Scene Swap',
    timestamp: '5h',
    likes: 567,
    comments: 34,
    isLiked: true,
  },
  {
    id: 3,
    creator: { username: 'creative_mind', avatar: '🧑‍🎨' },
    image: '✨',
    tool: 'AI Avatar',
    timestamp: '1d',
    likes: 890,
    comments: 45,
    isLiked: false,
  },
  {
    id: 4,
    creator: { username: 'art_lover', avatar: '👩' },
    image: '🎭',
    tool: 'Gender Swap',
    timestamp: '2d',
    likes: 1234,
    comments: 89,
    isLiked: false,
  },
];

const filters = ['For You', 'Following', 'Face Swap', 'Avatars', 'Trending'];

const DiscoveryFeed: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('For You');
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header - Threads Style */}
      <header className="bg-white border-b border-neutral-150 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Epiko</h1>
          <button
            onClick={() => navigate('/search')}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-95 transition-all duration-150"
          >
            <Search01Icon size={22} color="#000000" />
          </button>
        </div>

        {/* Filter Tabs - Threads Style */}
        <div className="flex border-b border-neutral-150 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-semibold transition-all relative ${
                selectedFilter === filter
                  ? 'text-black'
                  : 'text-neutral-500'
              }`}
            >
              {filter}
              {selectedFilter === filter && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Feed Content - Threads Style */}
      <main>
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="border-b border-neutral-150 animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Creator Header */}
            <div className="px-4 pt-3 pb-2 flex items-center justify-between">
              <button
                onClick={() => navigate(`/profile/${post.creator.username}`)}
                className="flex items-center gap-2.5 group"
              >
                <div className="w-9 h-9 bg-neutral-200 rounded-full flex items-center justify-center text-lg">
                  {post.creator.avatar}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-black text-sm group-hover:underline">
                    {post.creator.username}
                  </span>
                  <span className="text-xs text-neutral-500">{post.timestamp}</span>
                </div>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-95 transition-all">
                <MoreVerticalIcon size={18} color="#737373" />
              </button>
            </div>

            {/* Content Image */}
            <div
              className="w-full aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center cursor-pointer border-y border-neutral-150"
              onClick={() => navigate(`/reel/${post.id}`)}
            >
              <div className="text-center">
                <span className="text-8xl">{post.image}</span>
                <p className="text-xs text-neutral-500 mt-2 font-medium">Tap to view</p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="px-4 py-2.5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 group active:scale-95 transition-transform"
                  >
                    <FavouriteIcon
                      size={22}
                      color={post.isLiked ? '#ef4444' : '#000000'}
                      className={`transition-all ${post.isLiked ? 'fill-current' : ''}`}
                    />
                    <span className="text-sm text-neutral-700">{post.likes}</span>
                  </button>

                  <button
                    onClick={() => navigate(`/reel/${post.id}`)}
                    className="flex items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <Message01Icon size={22} color="#000000" />
                    <span className="text-sm text-neutral-700">{post.comments}</span>
                  </button>

                  <button className="active:scale-95 transition-transform">
                    <Share08Icon size={22} color="#000000" />
                  </button>
                </div>

                <button
                  onClick={() => alert('Saved')}
                  className="active:scale-95 transition-transform"
                >
                  <BookmarkAdd01Icon size={22} color="#000000" />
                </button>
              </div>

              {/* Tool Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 rounded-full">
                <SparklesIcon size={12} color="#525252" />
                <span className="text-xs font-medium text-neutral-700">{post.tool}</span>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default DiscoveryFeed;
