const accountSid = "ACe7426e866f0c26076e327ef4fedf7198";
const authToken = "6369d9101a6e6dad73d998930e410350";
const verifySid = "VAae6ff54678c9830378039215da94f5df";
const client = twilio(accountSid, authToken);

import twilio from "twilio";
import readline from "readline";
import { v4 as uuidv4 } from "uuid";

import { ApiError } from "../exceptions/api-error.js";

import userModel from "../models/user-model.js";

import userService from "./user-service.js";

import UserCreateDto from "../dto/user/user-create-dto.js";
import UserGetDto from "../dto/user/user-get-dto.js";

class SmsService {
  async sendSms(phone) {
    try {
      const verification = await client.verify.v2
        .services(verifySid)
        .verifications.create({ to: phone, channel: "sms" });

      if (verification.status === "approved") {
        return true;
      } else {
        throw ApiError.InvalidRequest("Code");
      }
    } catch (error) {
      throw ApiError.BadRequest(error);
    }
  }

  async verifySms({ code, phone }) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    try {
      const isApprove = await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: phone, code, amount: "4" });
      rl.close();

      if (isApprove.status === "approved") {
        return true;
      }
    } catch (error) {
      throw ApiError.InvalidRequest("Code");
    }
  }

  async signupByPhone({ name, phone }) {
    const nameExist = await userModel.findOne({ name });

    if (nameExist) {
      throw ApiError.BadRequest(`Пользователь с именем ${name} уже существует`);
    }

    const activationLink = uuidv4();

    const userDto = new UserCreateDto({
      name,
      email: null,
      activationLink,
      phoneNumber: phone,
    });

    const newUser = await userModel.create({ ...userDto });

    const tokens = await userService.generateAndSaveTokens(
      newUser._id,
      userDto
    );

    return { ...tokens, user: { ...userDto, _id: newUser._id } };
  }

  async loginByPhone(phoneNumber) {
    const user = await userModel.findOne({ phoneNumber });

    if (!user) {
      throw ApiError.BadRequest(`Пользователь не существует`);
    }
    console.log("user", user);
    console.log("phoneNumber", phoneNumber);
    const userDto = new UserGetDto(user);
    console.log("userDto", userDto);

    const tokens = await userService.generateAndSaveTokens(
      userDto._id,
      userDto
    );

    return { ...tokens, user: userDto };
  }
}

export default new SmsService();
