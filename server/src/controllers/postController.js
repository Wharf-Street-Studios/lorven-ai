import { supabaseAdmin } from '../config/supabase.js';

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { image, tool, caption } = req.body;

    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .insert([{
        creator_id: req.user.id,
        image,
        tool,
        caption
      }])
      .select(`
        *,
        creator:profiles!creator_id(id, full_name, username, avatar)
      `)
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(201).json({
      success: true,
      post: {
        id: post.id,
        creator: {
          id: post.creator.id,
          fullName: post.creator.full_name,
          username: post.creator.username,
          avatar: post.creator.avatar
        },
        image: post.image,
        tool: post.tool,
        caption: post.caption,
        createdAt: post.created_at
      }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get feed posts
// @route   GET /api/posts/feed
// @access  Public/Private (optional auth)
export const getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    // Get posts with likes and comments count
    const { data: posts, error, count } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        creator:profiles!creator_id(id, full_name, username, avatar),
        likes(count),
        comments(count)
      `, { count: 'exact' })
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      posts: posts.map(post => ({
        id: post.id,
        creator: {
          id: post.creator.id,
          fullName: post.creator.full_name,
          username: post.creator.username,
          avatar: post.creator.avatar
        },
        image: post.image,
        tool: post.tool,
        caption: post.caption,
        likesCount: post.likes[0]?.count || 0,
        commentsCount: post.comments[0]?.count || 0,
        shares: post.shares,
        createdAt: post.created_at
      })),
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res) => {
  try {
    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        creator:profiles!creator_id(id, full_name, username, avatar),
        comments(
          *,
          user:profiles!user_id(id, full_name, username, avatar),
          comment_likes(count)
        ),
        likes(count)
      `)
      .eq('id', req.params.id)
      .single();

    if (error || !post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      post: {
        id: post.id,
        creator: {
          id: post.creator.id,
          fullName: post.creator.full_name,
          username: post.creator.username,
          avatar: post.creator.avatar
        },
        image: post.image,
        tool: post.tool,
        caption: post.caption,
        likesCount: post.likes[0]?.count || 0,
        comments: post.comments.map(comment => ({
          id: comment.id,
          user: {
            id: comment.user.id,
            fullName: comment.user.full_name,
            username: comment.user.username,
            avatar: comment.user.avatar
          },
          text: comment.text,
          likesCount: comment.comment_likes[0]?.count || 0,
          createdAt: comment.created_at
        })),
        shares: post.shares,
        createdAt: post.created_at
      }
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Like/Unlike post
// @route   POST /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
  try {
    // Check if already liked
    const { data: existingLike } = await supabaseAdmin
      .from('likes')
      .select('id')
      .eq('post_id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (existingLike) {
      // Unlike
      await supabaseAdmin
        .from('likes')
        .delete()
        .eq('id', existingLike.id);

      // Get updated count
      const { count } = await supabaseAdmin
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', req.params.id);

      return res.json({
        success: true,
        liked: false,
        likesCount: count || 0
      });
    } else {
      // Like
      await supabaseAdmin
        .from('likes')
        .insert([{
          post_id: req.params.id,
          user_id: req.user.id
        }]);

      // Get updated count
      const { count } = await supabaseAdmin
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', req.params.id);

      return res.json({
        success: true,
        liked: true,
        likesCount: count || 0
      });
    }
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Save/Unsave post
// @route   POST /api/posts/:id/save
// @access  Private
export const savePost = async (req, res) => {
  try {
    // Check if already saved
    const { data: existingSave } = await supabaseAdmin
      .from('saves')
      .select('id')
      .eq('post_id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (existingSave) {
      // Unsave
      await supabaseAdmin
        .from('saves')
        .delete()
        .eq('id', existingSave.id);

      return res.json({
        success: true,
        saved: false
      });
    } else {
      // Save
      await supabaseAdmin
        .from('saves')
        .insert([{
          post_id: req.params.id,
          user_id: req.user.id
        }]);

      return res.json({
        success: true,
        saved: true
      });
    }
  } catch (error) {
    console.error('Save post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const { data: comment, error } = await supabaseAdmin
      .from('comments')
      .insert([{
        post_id: req.params.id,
        user_id: req.user.id,
        text
      }])
      .select(`
        *,
        user:profiles!user_id(id, full_name, username, avatar)
      `)
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(201).json({
      success: true,
      comment: {
        id: comment.id,
        user: {
          id: comment.user.id,
          fullName: comment.user.full_name,
          username: comment.user.username,
          avatar: comment.user.avatar
        },
        text: comment.text,
        createdAt: comment.created_at
      }
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    // Check if post exists and belongs to user
    const { data: post } = await supabaseAdmin
      .from('posts')
      .select('creator_id')
      .eq('id', req.params.id)
      .single();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.creator_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', req.params.id);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user posts
// @route   GET /api/posts/user/:username
// @access  Public
export const getUserPosts = async (req, res) => {
  try {
    // Get user by username
    const { data: user } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('username', req.params.username)
      .single();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user posts
    const { data: posts, error } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        creator:profiles!creator_id(id, full_name, username, avatar),
        likes(count),
        comments(count)
      `)
      .eq('creator_id', user.id)
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      posts: posts.map(post => ({
        id: post.id,
        creator: {
          id: post.creator.id,
          fullName: post.creator.full_name,
          username: post.creator.username,
          avatar: post.creator.avatar
        },
        image: post.image,
        tool: post.tool,
        caption: post.caption,
        likesCount: post.likes[0]?.count || 0,
        commentsCount: post.comments[0]?.count || 0,
        shares: post.shares,
        createdAt: post.created_at
      }))
    });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
