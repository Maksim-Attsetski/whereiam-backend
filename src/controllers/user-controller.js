import { validationResult } from "express-validator";

import MailService from "../services/mail-service.js";
import UserService from "../services/user-service.js";

import { ApiError } from "../exceptions/api-error.js";
import { validation } from "../utils/validation.js";

class UserController {
  async registration(req, res, next) {
    try {
      await validation(req);
      const userData = await UserService.registration(req.body);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000 * 30,
        httpOnly: true,
        SameSite: "None",
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      await validation(req);
      const userData = await UserService.login(req.body);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000 * 30,
        httpOnly: true,
        SameSite: "None",
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req, res, next) {
    try {
      const { _id } = req.params;
      await UserService.deleteUser(_id);
      return res.json(_id);
    } catch (error) {
      next(error);
    }
  }
  async activateLink(req, res, next) {
    try {
      const link = req.params.link;

      await MailService.activate(link);

      return res.redirect(process.env.SITE_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await UserService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000 * 30,
        httpOnly: true,
        SameSite: "None",
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = UserService.getUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
