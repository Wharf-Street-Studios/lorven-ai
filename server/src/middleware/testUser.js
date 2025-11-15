/**
 * Test User Middleware
 * Provides a mock user for development/testing without full authentication
 */

export const mockUser = async (req, res, next) => {
  // If user is already authenticated (via protect middleware), skip
  if (req.user) {
    return next();
  }

  // Create a mock user for testing
  req.user = {
    id: 'test-user-' + Date.now(),
    email: 'test@example.com',
    username: 'testuser'
  };

  next();
};

export default mockUser;
