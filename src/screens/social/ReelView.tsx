import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFollow } from '../../context/FollowContext';
import { usePostInteraction } from '../../context/PostInteractionContext';
import { Avatar } from '../../components/ui';
import {
  FavouriteIcon,
  Message01Icon,
  Share08Icon,
  BookmarkAdd01Icon,
  Cancel01Icon,
  ArrowLeft01Icon,
  Delete02Icon,
  SmileIcon,
} from 'hugeicons-react';

// Map URL id param to actual post IDs
const postIdMap: Record<string, string> = {
  '1': 'post_1',
  '2': 'post_2',
  '3': 'post_3',
  '4': 'post_4',
};

const mockReels: Record<string, any> = {
  post_1: {
    id: 'post_1',
    creator: {
      id: '2',
      username: 'sarah_creates',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
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
  },
  post_2: {
    id: 'post_2',
    creator: {
      id: '3',
      username: 'john_ai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    },
    content: {
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=800&fit=crop',
      tool: 'AI Avatar',
    },
    stats: {
      likes: 567,
      comments: 34,
      shares: 8,
    },
  },
  post_3: {
    id: 'post_3',
    creator: {
      id: '5',
      username: 'creative_mike',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    },
    content: {
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop',
      tool: 'HD Enhance',
    },
    stats: {
      likes: 890,
      comments: 45,
      shares: 15,
    },
  },
  post_4: {
    id: 'post_4',
    creator: {
      id: '4',
      username: 'art_lover',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
    },
    content: {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
      tool: 'Age Transform',
    },
    stats: {
      likes: 1234,
      comments: 89,
      shares: 22,
    },
  },
};

const ReelView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { isFollowing, followUser, unfollowUser } = useFollow();
  const {
    isLiked,
    likePost,
    unlikePost,
    getLikeCount,
    isSaved,
    savePost,
    unsavePost,
    getComments,
    addComment,
    getCommentCount,
  } = usePostInteraction();

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Get the actual post ID from the URL param
  const postId = id ? (postIdMap[id] || id) : 'post_1';
  const reel = mockReels[postId] || mockReels['post_1'];

  const postLiked = isLiked(postId);
  const postSaved = isSaved(postId);
  const likeCount = getLikeCount(postId, reel.stats.likes);
  const commentCount = getCommentCount(postId, reel.stats.comments);
  const comments = getComments(postId);
  const creatorFollowing = isFollowing(reel.creator.id);

  const handleLike = () => {
    if (postLiked) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
  };

  const handleSave = () => {
    if (postSaved) {
      unsavePost(postId);
    } else {
      savePost(postId);
    }
  };

  const handleFollow = () => {
    if (creatorFollowing) {
      unfollowUser(reel.creator.id);
    } else {
      followUser(reel.creator.id);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && user) {
      addComment(postId, newComment, user.username, user.avatar);
      setNewComment('');
      setShowEmojiPicker(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this ${reel.content.tool} creation by @${reel.creator.username}`,
        text: `Amazing AI creation using ${reel.content.tool}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const commonEmojis = ['😊', '❤️', '🔥', '👍', '😍', '🎉', '💯', '✨', '👏', '🙌'];

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
                creatorFollowing
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white text-black'
              }`}
            >
              {creatorFollowing ? '✓ Following' : '+ Follow'}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-6">
            <button onClick={handleLike} className="text-center group">
              <div className={`transition-all duration-300 ${postLiked ? 'scale-110' : 'group-hover:scale-110'}`}>
                <FavouriteIcon
                  size={32}
                  color={postLiked ? '#ef4444' : '#ffffff'}
                  className={postLiked ? 'fill-current' : ''}
                />
              </div>
              <span className="text-white text-sm font-semibold mt-1 block">{likeCount}</span>
            </button>

            <button onClick={() => setShowComments(true)} className="text-center group">
              <div className="group-hover:scale-110 transition-all duration-300">
                <Message01Icon size={32} color="#ffffff" />
              </div>
              <span className="text-white text-sm font-semibold mt-1 block">{commentCount}</span>
            </button>

            <button onClick={handleShare} className="text-center group">
              <div className="group-hover:scale-110 transition-all duration-300">
                <Share08Icon size={32} color="#ffffff" />
              </div>
              <span className="text-white text-sm font-semibold mt-1 block">{reel.stats.shares}</span>
            </button>

            <button onClick={handleSave} className="text-center group">
              <div className={`transition-all duration-300 ${postSaved ? 'scale-110' : 'group-hover:scale-110'}`}>
                <BookmarkAdd01Icon
                  size={32}
                  color={postSaved ? '#60a5fa' : '#ffffff'}
                  className={postSaved ? 'fill-current' : ''}
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
              {comments.length === 0 ? (
                <div className="py-12 text-center">
                  <Message01Icon size={48} color="#737373" className="mx-auto mb-3" />
                  <p className="text-dark-500 text-sm">No comments yet</p>
                  <p className="text-dark-500 text-xs mt-1">Be the first to comment!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3 group">
                    <Avatar
                      name={comment.username}
                      src={comment.avatar}
                      size="medium"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-white text-sm truncate">{comment.username}</span>
                        <span className="text-xs text-dark-500 flex-shrink-0">{formatTimestamp(comment.timestamp)}</span>
                      </div>
                      <p className="text-white text-sm mb-2 break-words">{comment.text}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <button className="flex items-center space-x-1 text-dark-500 hover:text-red-500 transition-colors">
                          <FavouriteIcon size={14} color="currentColor" />
                          <span className="font-semibold">{comment.likes}</span>
                        </button>
                        <button className="text-dark-500 hover:text-white font-semibold transition-colors">Reply</button>
                        {user && comment.userId === user.id && (
                          <button className="text-dark-500 hover:text-red-500 font-semibold transition-colors ml-auto opacity-0 group-hover:opacity-100">
                            <Delete02Icon size={14} color="currentColor" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input */}
            <div className="px-6 py-4 border-t border-dark-100 bg-black">
              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="mb-3 flex flex-wrap gap-2 p-3 bg-dark-100 rounded-xl">
                  {commonEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setNewComment(newComment + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="text-2xl hover:scale-125 transition-transform active:scale-95"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 transition-colors flex-shrink-0"
                >
                  <SmileIcon size={22} color={showEmojiPicker ? '#60a5fa' : '#a3a3a3'} />
                </button>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1 px-4 py-3 border border-dark-100 rounded-xl focus:outline-none focus:border-blue-500 bg-dark-150 text-white placeholder-dark-500 transition-all text-sm"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 text-sm flex-shrink-0"
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
