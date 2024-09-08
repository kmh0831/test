const jwt = require('jsonwebtoken');

// JWT 토큰에서 사용자 ID 추출
function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 환경 변수로 설정된 JWT 시크릿
    return decoded.sub; // Cognito에서 제공하는 사용자 ID
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}

module.exports = { getUserIdFromToken };
