import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '../../components/ui';
import { ArrowLeft01Icon, Search01Icon, FavouriteIcon } from 'hugeicons-react';

const trendingHashtags = ['#AIArt', '#FaceSwap', '#CoupleGoals', '#AIAvatar', '#BabyPrediction', '#GlowUp'];

const categories = ['All', 'Face Swap', 'AI Avatar', 'Couples', 'Baby Predictor', 'Transform'];

const mockSearchResults = [
  { id: 1, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop', creator: 'sarah_creates', likes: 234 },
  { id: 2, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop', creator: 'john_ai', likes: 567 },
  { id: 3, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop', creator: 'creative_mind', likes: 890 },
  { id: 4, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop', creator: 'art_lover', likes: 432 },
  { id: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop', creator: 'couple_goals', likes: 678 },
  { id: 6, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop', creator: 'baby_magic', likes: 345 },
];

const SearchExplore: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'most-liked'>('trending');

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all"
            >
              <ArrowLeft01Icon size={24} color="#ffffff" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search content, creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-11 bg-dark-100 border border-dark-100 rounded-xl focus:outline-none focus:border-white transition-all text-white font-medium placeholder:text-dark-500"
              />
              <Search01Icon size={20} color="#737373" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Trending Hashtags */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {trendingHashtags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-4 py-2 bg-dark-100 rounded-xl text-sm font-semibold text-white hover:bg-dark-150 transition-colors whitespace-nowrap border border-dark-100"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-black/95 backdrop-blur-sm border-b border-dark-100 px-4 py-4 sticky top-[120px] z-10">
        <div className="max-w-2xl mx-auto">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto mb-3 -mx-4 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-dark-100 text-white hover:bg-dark-150 border border-dark-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-dark-500 font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-dark-100 border border-dark-100 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-white transition-all"
            >
              <option value="trending">Trending</option>
              <option value="recent">Recent</option>
              <option value="most-liked">Most Liked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <main className="px-4 py-5 max-w-2xl mx-auto">
        {searchQuery ? (
          <div>
            <p className="text-sm text-dark-500 font-semibold mb-5">
              Showing results for "<span className="text-blue-500">{searchQuery}</span>"
            </p>
            <div className="grid grid-cols-2 gap-4">
              {mockSearchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => navigate(`/reel/${result.id}`)}
                  className="bg-dark-100 rounded-3xl overflow-hidden relative hover:opacity-80 transition-opacity"
                >
                  <div className="w-full aspect-square">
                    <img
                      src={result.image}
                      alt={`Creation by ${result.creator}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span className="font-semibold truncate">@{result.creator}</span>
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full flex-shrink-0">
                        <FavouriteIcon size={14} color="#ffffff" />
                        <span className="font-bold">{result.likes}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <Search01Icon size={80} color="#737373" className="mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">Discover Content</h3>
            <p className="text-dark-500 text-lg">Search for creators, content, or explore trending hashtags</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default SearchExplore;
