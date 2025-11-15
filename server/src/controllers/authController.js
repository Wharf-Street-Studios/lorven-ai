import { supabase, supabaseAdmin } from '../config/supabase.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    // Validation
    if (!fullName || !email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Check if username already exists
    const { data: existingUsername } = await supabaseAdmin
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken'
      });
    }

    // Sign up user with Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username,
          provider: 'email'
        }
      }
    });

    if (signUpError) {
      return res.status(400).json({
        success: false,
        message: signUpError.message
      });
    }

    if (!authData.user) {
      return res.status(400).json({
        success: false,
        message: 'User registration failed'
      });
    }

    // Check if email confirmation is required
    if (!authData.session) {
      return res.status(201).json({
        success: true,
        message: 'Registration successful. Please check your email to confirm your account.',
        user: {
          id: authData.user.id,
          email: authData.user.email
        }
      });
    }

    // Get user profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    res.status(201).json({
      success: true,
      token: authData.session.access_token,
      user: {
        id: profile.id,
        fullName: profile.full_name,
        email: profile.email,
        username: profile.username,
        avatar: profile.avatar,
        credits: profile.credits,
        authProvider: profile.auth_provider,
        createdAt: profile.created_at
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Sign in with Supabase Auth
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Get user profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (!profile.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Account has been deactivated'
      });
    }

    res.json({
      success: true,
      token: authData.session.access_token,
      user: {
        id: profile.id,
        fullName: profile.full_name,
        email: profile.email,
        username: profile.username,
        avatar: profile.avatar,
        credits: profile.credits,
        authProvider: profile.auth_provider,
        createdAt: profile.created_at
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select(`
        *,
        followers:followers!following_id(count),
        following:followers!follower_id(count)
      `)
      .eq('id', req.user.id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: profile.id,
        fullName: profile.full_name,
        email: profile.email,
        username: profile.username,
        avatar: profile.avatar,
        bio: profile.bio,
        credits: profile.credits,
        followersCount: profile.followers[0]?.count || 0,
        followingCount: profile.following[0]?.count || 0,
        authProvider: profile.auth_provider,
        isVerified: profile.is_verified,
        createdAt: profile.created_at
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Google OAuth
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'ID token is required'
      });
    }

    // Sign in with Google
    const { data: authData, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Get user profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    res.json({
      success: true,
      token: authData.session.access_token,
      user: {
        id: profile.id,
        fullName: profile.full_name,
        email: profile.email,
        username: profile.username,
        avatar: profile.avatar,
        credits: profile.credits,
        authProvider: profile.auth_provider,
        createdAt: profile.created_at
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Apple OAuth
// @route   POST /api/auth/apple
// @access  Public
export const appleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'ID token is required'
      });
    }

    // Sign in with Apple
    const { data: authData, error } = await supabase.auth.signInWithIdToken({
      provider: 'apple',
      token: idToken,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Get user profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    res.json({
      success: true,
      token: authData.session.access_token,
      user: {
        id: profile.id,
        fullName: profile.full_name,
        email: profile.email,
        username: profile.username,
        avatar: profile.avatar,
        credits: profile.credits,
        authProvider: profile.auth_provider,
        createdAt: profile.created_at
      }
    });
  } catch (error) {
    console.error('Apple auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Facebook OAuth
// @route   POST /api/auth/facebook
// @access  Public
export const facebookAuth = async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: 'Access token is required'
      });
    }

    // Sign in with Facebook
    const { data: authData, error } = await supabase.auth.signInWithIdToken({
      provider: 'facebook',
      token: accessToken,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Get user profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    res.json({
      success: true,
      token: authData.session.access_token,
      user: {
        id: profile.id,
        fullName: profile.full_name,
        email: profile.email,
        username: profile.username,
        avatar: profile.avatar,
        credits: profile.credits,
        authProvider: profile.auth_provider,
        createdAt: profile.created_at
      }
    });
  } catch (error) {
    console.error('Facebook auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
