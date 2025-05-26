const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token and extract user information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object|Function} Response object or next function call
 */
function verifyToken(req, res, next) {
  try {
    // Get the authorization header
    const authHeader = req.headers['authorization'];
    
    // Check if header exists
    if (!authHeader) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }
    
    // Extract the token - support "Bearer" token format
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.split(' ')[1] 
      : authHeader;
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token format.' 
      });
    }
    
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ 
            success: false, 
            message: 'Token expired.' 
          });
        }
        
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid token.' 
        });
      }
      
      // Add decoded user data to request object
      req.user = decoded;
      
      // Also include user_id for backward compatibility
      req.user_id = decoded.id || decoded.userId || decoded._id;
      
      // Continue to the next middleware/route handler
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error during authentication.'
    });
  }
}

module.exports = verifyToken;