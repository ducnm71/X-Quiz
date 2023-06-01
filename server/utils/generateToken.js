const jwt = require('jsonwebtoken');
const UserToken = require('../models/userTokenModel');

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN, JWT_EXPRIRE_REFRESH_TOKEN, JWT_EXPRIRE_ACCESS_TOKEN } =
  process.env;

const genrateToken = async (user) => {
  try {
    const payload = { user };
    const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN, { expiresIn: JWT_EXPRIRE_ACCESS_TOKEN });
    let refreshToken = '';

    const existUserToken = await UserToken.findOne({ userId: user._id });

    if (existUserToken) {
      refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_EXPRIRE_REFRESH_TOKEN });
      existUserToken.token = refreshToken;
      await existUserToken.save();
    } else {
      refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_EXPRIRE_REFRESH_TOKEN });

      await UserToken.create({ userId: user._id, token: refreshToken });
    }
    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
  }
};

const decodedAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET_ACCESS_TOKEN);
};

module.exports = { genrateToken, decodedAccessToken };
