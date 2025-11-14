import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../../components/ui';
import {
  FavouriteIcon,
  Message01Icon,
  Share08Icon,
  BookmarkAdd01Icon,
  Cancel01Icon,
  ArrowLeft01Icon,
} from 'hugeicons-react';

const mockReel = {
  id: 1,
  creator: {
    username: 'sarah_creates',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
    isFollowing: false,
  },
  content: {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop',
    tool: 'Face Swap',
  },
  stats: {
    likes: 234,
    comments: 12,
    shares: 5,
  },
  isLiked: false,
  isSaved: false,
};

const mockComments = [
  { id: 1, user: 'john_ai', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces', text: 'This is amazing! 🔥', likes: 5 },
  { id: 2, user: 'creative_mind', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces', text: 'Love the style!', likes: 3 },
  { id: 3, user: 'art_lover', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces', text: 'How did you make this?', likes: 7 },
];

const ReelView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showComments, setShowComments] = useState(false);
  const [reel, setReel] = useState(mockReel);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setReel({
      ...reel,
      isLiked: !reel.isLiked,
      stats: {
        ...reel.stats,
        likes: reel.isLiked ? reel.stats.likes - 1 : reel.stats.likes + 1,
      },
    });
  };

  const handleSave = () => {
    setReel({ ...reel, isSaved: !reel.isSaved });
  };

  const handleFollow = () => {
    setReel({
      ...reel,
      creator: { ...reel.creator, isFollowing: !reel.creator.isFollowing },
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
        text: newComment,
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setReel({
        ...reel,
        stats: { ...reel.stats, comments: reel.stats.comments + 1 },
      });
    }
  };

  return (
    <div className="h-screen bg-black relative">
      {/* Content */}
      <div className="w-full h-full flex items-center justify-center bg-black">
        <img
          src={reel.content.image}
          alt={reel.content.tool}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft01Icon size={24} color="#ffffff" />
          </button>
          <span className="text-white text-sm font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            {reel.content.tool}
          </span>
        </div>
      </div>

      {/* Creator Info & Actions */}
      <div className="absolute bottom-20 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-end justify-between">
          {/* Creator Info */}
          <div className="flex-1 mr-4">
            <button
              onClick={() => navigate(`/profile/${reel.creator.username}`)}
              className="flex items-center space-x-3 mb-3"
            >
              <Avatar
                name={reel.creator.username}
                src={reel.creator.avatar}
                size="large"
              />
              <div className="text-left">
                <p className="font-bold text-white text-lg">{reel.creator.username}</p>
                <p className="text-dark-500 text-sm">Tap to view profile</p>
              </div>
            </button>
            <button
              onClick={handleFollow}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                reel.creator.isFollowing
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white text-black'
              }`}
            >
              {reel.creator.isFollowing ? '✓ Following' : '+ Follow'}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-6">
            <button onClick={handleLike} className="text-center group">
              <div className={`transition-all duration-300 ${reel.isLiked ? 'scale-110' : 'group-hover:scale-110'}`}>
                <FavouriteIcon
                  size={32}
                  color={reel.isLiked ? '#ef4444' : '#ffffff'}
                  className={reel.isLiked ? 'fill-current' : ''}
                />
              </div>
              <span className="text-white text-sm font-semibold mt-1 block">{reel.stats.likes}</span>
            </button>

            <button onClick={() => setShowComments(true)} className="text-center group">
              <div className="group-hover:scale-110 transition-all duration-300">
                <Message01Icon size={32} color="#ffffff" />
              </div>
              <span className="text-white text-sm font-semibold mt-1 block">{reel.stats.comments}</span>
            </button>

            <button className="text-center group">
              <div className="group-hover:scale-110 transition-all duration-300">
                <Share08Icon size={32} color="#ffffff" />
              </div>
              <span className="text-white text-sm font-semibold mt-1 block">{reel.stats.shares}</span>
            </button>

            <button onClick={handleSave} className="text-center group">
              <div className={`transition-all duration-300 ${reel.isSaved ? 'scale-110' : 'group-hover:scale-110'}`}>
                <BookmarkAdd01Icon
                  size={32}
                  color={reel.isSaved ? '#60a5fa' : '#ffffff'}
                  className={reel.isSaved ? 'fill-current' : ''}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="absolute inset-0 bg-black/50 flex items-end" onClick={() => setShowComments(false)}>
          <div
            className="w-full bg-black rounded-t-3xl max-h-[70vh] flex flex-col border-t border-dark-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Comments Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-dark-100 bg-black">
              <h3 className="text-xl font-bold text-white">
                Comments ({comments.length})
              </h3>
              <button
                onClick={() => setShowComments(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-dark-100 transition-all duration-300 active:scale-90"
              >
                <Cancel01Icon size={24} color="#a3a3a3" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-black">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Avatar
                    name={comment.user}
                    src={comment.avatar}
                    size="medium"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-white text-sm">{comment.user}</span>
                      <span className="text-xs text-dark-500">2h ago</span>
                    </div>
                    <p className="text-white mb-2">{comment.text}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <button className="flex items-center space-x-1 text-dark-500 hover:text-white transition-colors">
                        <FavouriteIcon size={14} color="currentColor" />
                        <span className="font-semibold">{comment.likes}</span>
                      </button>
                      <button className="text-dark-500 hover:text-white font-semibold transition-colors">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="px-6 py-4 border-t border-dark-100 bg-black">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1 px-4 py-3.5 border border-dark-100 rounded-xl focus:outline-none focus:border-blue-500 bg-dark-150 text-white placeholder-dark-500 transition-all font-medium"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-6 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelView;
