import phoneService from "../services/phone-service.js";

class SmsController {
  async sendSms(req, res, next) {
    try {
      await phoneService.sendSms(req.params.phone);
      res.json("Sms has been sent");
    } catch (error) {
      next(error);
    }
  }

  async verifySms(req, res, next) {
    try {
      const isVerify = await phoneService.verifySms(req.body);
      res.json(isVerify);
    } catch (error) {
      next(error);
    }
  }

  async signupByPhone(req, res, next) {
    try {
      const user = await phoneService.signupByPhone(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async loginByPhone(req, res, next) {
    try {
      const user = await phoneService.loginByPhone(req.body.phone);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new SmsController();
