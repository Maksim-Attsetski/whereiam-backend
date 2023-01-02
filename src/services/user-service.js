import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import UserModel from "../models/user-model.js";

import TokenService from "./token-service.js";
import mailService from "./mail-service.js";

import UserCreateDto from "../dto/user/user-create-dto.js";
import UserGetDto from "../dto/user/user-get-dto.js";

import { ApiError } from "../exceptions/api-error.js";

class UserService {
  async generateAndSaveTokens(id, user) {
    const tokens = await TokenService.generateTokens({ ...user });
    await TokenService.saveToken(id, tokens.refreshToken);

    return { ...tokens };
  }

  async registration({ name, email, password }) {
    const nameExist = await UserModel.findOne({ name });

    if (nameExist) {
      throw ApiError.AlreadyExist(
        `Пользователь с именем ${name} уже существует`
      );
    }

    if (nameExist.email === email) {
      throw ApiError.AlreadyExist(
        `Пользователь с почтой ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const activationLink = uuidv4();

    const userDto = new UserCreateDto({
      name,
      email,
      activationLink,
      phoneNumber: null,
    });

    const newUser = await UserModel.create({
      ...userDto,
      password: hashPassword,
    });

    await mailService.sendActivationLink(email, activationLink);
    const tokens = await this.generateAndSaveTokens(newUser._id, userDto);

    return { ...tokens, user: { ...userDto, _id: newUser._id } };
  }

  async login({ email, password }) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.NotExist(`Пользователя с почтой ${email} не существует`);
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    const userDto = new UserGetDto(user);

    if (!isPassEqual) {
      throw ApiError.BadRequest(`Пароль ${password} неверный`);
    }

    const tokens = await this.generateAndSaveTokens(user._id, userDto);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = TokenService.removeToken(refreshToken);
    return token;
  }

  async getUsers() {
    const users = await UserModel.find();
    return users;
  }

  async checkIsExist(query) {
    if (Object.keys(query).length < 1) {
      return false;
    }
    const users = await UserModel.findOne(query);
    return !!users;
  }

  async deleteUser(id) {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      throw ApiError.NotExist(`Пользователя с id: ${id} не существует`);
    }

    await TokenService.removeToken(null, user._id);
    return user._id;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      return ApiError.UnauthorizedError();
    }
    const tokenIsValid = await TokenService.validateRefreshToken(refreshToken);
    const tokenData = await TokenService.getToken(refreshToken);

    if (!tokenData || !tokenIsValid) {
      return ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(tokenData.userId);
    const userDto = new UserGetDto(user);

    const tokens = await this.generateAndSaveTokens(user._id, userDto);

    return { ...tokens, user: userDto };
  }
}

export default new UserService();
