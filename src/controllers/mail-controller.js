import MailService from "../services/mail-service.js";

class UserController {
  async sendLink(req, res, next) {
    try {
      const { link, to } = req.body;
      await MailService.sendActivationLink(to, link);

      return res.json("Message has been send to " + to);
    } catch (error) {
      next(error);
    }
  }
  async activateLink(req, res, next) {
    try {
      await MailService.activate(req.params.link);

      return res.redirect(process.env.SITE_URL);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
