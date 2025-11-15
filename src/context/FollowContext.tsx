import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
}

interface FollowContextType {
  following: Set<string>; // Set of user IDs
  followers: Set<string>; // Set of user IDs
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  isFollowing: (userId: string) => boolean;
  getFollowerCount: (userId: string) => number;
  getFollowingCount: (userId: string) => number;
  getFollowers: () => UserProfile[];
  getFollowing: () => UserProfile[];
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

const FOLLOW_STORAGE_KEY = 'epiko_follow_data';

// Mock user data for demo purposes
const mockUsers: UserProfile[] = [
  {
    id: '2',
    username: 'sarah_creates',
    fullName: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
    bio: 'AI Artist & Content Creator\nLove creating romantic & dreamy content',
    followers: 15600,
    following: 234,
    posts: 124,
  },
  {
    id: '3',
    username: 'john_ai',
    fullName: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    bio: 'Digital Artist | AI Enthusiast',
    followers: 8900,
    following: 456,
    posts: 87,
  },
  {
    id: '4',
    username: 'art_lover',
    fullName: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
    bio: 'Creating magic with AI',
    followers: 12400,
    following: 189,
    posts: 156,
  },
  {
    id: '5',
    username: 'creative_mike',
    fullName: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    bio: 'AI Content Creator | Tech Lover',
    followers: 23100,
    following: 567,
    posts: 234,
  },
  {
    id: '6',
    username: 'design_queen',
    fullName: 'Lisa Anderson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
    bio: 'Graphic Designer meets AI',
    followers: 18700,
    following: 345,
    posts: 198,
  },
];

export const FollowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [following, setFollowing] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(FOLLOW_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return new Set(data.following || []);
      }
      // Start with some default follows for demo
      return new Set(['2', '3']);
    } catch {
      return new Set(['2', '3']);
    }
  });

  const [followers, setFollowers] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(FOLLOW_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return new Set(data.followers || []);
      }
      // Mock some followers for demo
      return new Set(['2', '4', '5']);
    } catch {
      return new Set(['2', '4', '5']);
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        FOLLOW_STORAGE_KEY,
        JSON.stringify({
          following: Array.from(following),
          followers: Array.from(followers),
        })
      );
    } catch (error) {
      console.error('Failed to save follow data:', error);
    }
  }, [following, followers]);

  const followUser = (userId: string) => {
    setFollowing((prev) => new Set(prev).add(userId));
  };

  const unfollowUser = (userId: string) => {
    setFollowing((prev) => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
  };

  const isFollowing = (userId: string): boolean => {
    return following.has(userId);
  };

  const getFollowerCount = (userId: string): number => {
    // For the current user
    if (userId === '1') {
      return followers.size;
    }
    // For other users, return their mock follower count with adjustment
    const user = mockUsers.find((u) => u.id === userId);
    if (user) {
      return isFollowing(userId) ? user.followers + 1 : user.followers;
    }
    return 0;
  };

  const getFollowingCount = (userId: string): number => {
    // For the current user
    if (userId === '1') {
      return following.size;
    }
    // For other users, return their mock following count
    const user = mockUsers.find((u) => u.id === userId);
    return user?.following || 0;
  };

  const getFollowers = (): UserProfile[] => {
    return mockUsers.filter((user) => followers.has(user.id));
  };

  const getFollowing = (): UserProfile[] => {
    return mockUsers.filter((user) => following.has(user.id));
  };

  return (
    <FollowContext.Provider
      value={{
        following,
        followers,
        followUser,
        unfollowUser,
        isFollowing,
        getFollowerCount,
        getFollowingCount,
        getFollowers,
        getFollowing,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (context === undefined) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
};
