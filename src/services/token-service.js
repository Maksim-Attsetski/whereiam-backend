import jwt from "jsonwebtoken";

import TokenModel from "../models/token-model.js";

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({ userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken, userId = null) {
    const searchObj = userId ? { userId } : { refreshToken };
    const token = await TokenModel.findOneAndDelete(searchObj);
    return token;
  }

  async validateAccessToken(token) {
    try {
      const tokenData = jwt.verify(token, process.env.SECRET_KEY_ACCESS);
      return tokenData;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const tokenData = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
      return tokenData;
    } catch (error) {
      return null;
    }
  }

  async getToken(refreshToken) {
    try {
      const tokenData = await TokenModel.findOne({ refreshToken });
      return tokenData;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
