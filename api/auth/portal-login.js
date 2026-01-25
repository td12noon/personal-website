const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'ACCESS CODE REQUIRED' });
    }

    const passwordHash = process.env.PORTAL_PASSWORD_HASH;

    if (!passwordHash) {
      console.error('PORTAL_PASSWORD_HASH environment variable not set');
      return res.status(500).json({ error: 'SYSTEM NOT CONFIGURED' });
    }

    const isValid = await bcrypt.compare(password, passwordHash);

    if (!isValid) {
      return res.status(401).json({ error: 'ACCESS DENIED' });
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET environment variable not set');
      return res.status(500).json({ error: 'SYSTEM ERROR' });
    }

    const token = jwt.sign(
      { portal: true, timestamp: Date.now() },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    console.error('Portal login error:', error);
    return res.status(500).json({ error: 'SYSTEM ERROR' });
  }
};
