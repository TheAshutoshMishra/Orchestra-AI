/**
 * Auth Middleware - Verify JWT Token
 * Attach user to req.user
 */
export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Placeholder - implement JWT verification
    // For now, assume token is valid and set a dummy user
    req.user = { _id: 'user-id-here' };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

export default { authenticate };
