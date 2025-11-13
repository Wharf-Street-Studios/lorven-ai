import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BottomNavigation } from '../../components/ui';
import { Settings02Icon, GridIcon, FavouriteIcon } from 'hugeicons-react';

const mockUserCreations = [
  { id: 1, emoji: '🎨', likes: 45, tool: 'Face Swap' },
  { id: 2, emoji: '🌅', likes: 89, tool: 'Scene Swap' },
  { id: 3, emoji: '✨', likes: 123, tool: 'AI Avatar' },
  { id: 4, emoji: '🎭', likes: 67, tool: 'Gender Swap' },
  { id: 5, emoji: '💫', likes: 234, tool: 'Enhancement' },
  { id: 6, emoji: '🌟', likes: 156, tool: 'Couple Photo' },
];

const mockLikedContent = [
  { id: 1, emoji: '💕', creator: 'sarah_creates', likes: 890 },
  { id: 2, emoji: '🎭', creator: 'john_ai', likes: 567 },
  { id: 3, emoji: '🌈', creator: 'art_lover', likes: 1234 },
];

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'liked'>('posts');

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 pb-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-dark-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            👤
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Sign In Required</h2>
          <p className="text-sm text-dark-600 mb-8 max-w-xs mx-auto">
            Sign in to view your profile and creations
          </p>
          <button
            onClick={() => navigate('/sign-in')}
            className="bg-white text-black font-semibold text-sm px-8 py-2.5 rounded-xl hover:bg-neutral-100 active:scale-95 transition-all"
          >
            Sign In
          </button>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">{user.username}</h1>
          <button
            onClick={() => navigate('/settings')}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-dark-150 active:scale-95 transition-all"
          >
            <Settings02Icon size={22} color="#ffffff" />
          </button>
        </div>
      </header>

      {/* Profile Info */}
      <div className="px-4 py-6">
        <div className="flex items-start justify-between mb-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-dark-100 rounded-full flex items-center justify-center text-4xl">
            {user.avatar || '👤'}
          </div>

          {/* Stats */}
          <div className="flex gap-6 pt-2">
            <div className="text-center">
              <div className="font-bold text-white text-base">{mockUserCreations.length}</div>
              <div className="text-sm text-dark-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-base">1.2K</div>
              <div className="text-sm text-dark-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-base">890</div>
              <div className="text-sm text-dark-600">Following</div>
            </div>
          </div>
        </div>

        {/* Name and Bio */}
        <div className="mb-4">
          <h2 className="font-semibold text-white text-base mb-1">{user.fullName}</h2>
          <p className="text-sm text-dark-600">
            Creating AI-powered content ✨
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/profile/edit')}
            className="flex-1 bg-dark-100 text-white font-semibold text-sm py-2 rounded-xl hover:bg-dark-150 active:scale-98 transition-all"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate('/wallet')}
            className="flex-1 bg-dark-100 text-white font-semibold text-sm py-2 rounded-xl hover:bg-dark-150 active:scale-98 transition-all"
          >
            Wallet
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-dark-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all relative ${
              activeTab === 'posts' ? 'text-white' : 'text-dark-600'
            }`}
          >
            <GridIcon size={20} color={activeTab === 'posts' ? '#ffffff' : '#a3a3a3'} />
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all relative ${
              activeTab === 'liked' ? 'text-white' : 'text-dark-600'
            }`}
          >
            <FavouriteIcon
              size={20}
              color={activeTab === 'liked' ? '#ffffff' : '#a3a3a3'}
              className={activeTab === 'liked' ? 'fill-current' : ''}
            />
            {activeTab === 'liked' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-0.5 bg-dark-100">
        {(activeTab === 'posts' ? mockUserCreations : mockLikedContent).map((item, index) => (
          <div
            key={item.id}
            onClick={() => navigate(`/reel/${item.id}`)}
            className="aspect-square bg-gradient-to-br from-dark-100 to-dark-150 flex items-center justify-center cursor-pointer active:opacity-70 transition-opacity"
          >
            <span className="text-5xl">{item.emoji}</span>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {activeTab === 'posts' && mockUserCreations.length === 0 && (
        <div className="py-16 text-center">
          <div className="w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GridIcon size={28} color="#a3a3a3" />
          </div>
          <p className="text-sm font-semibold text-white mb-1">No posts yet</p>
          <p className="text-xs text-dark-600">
            Start creating with AI tools
          </p>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default UserProfile;
