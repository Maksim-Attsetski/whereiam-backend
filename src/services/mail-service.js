import nodemailer from "nodemailer";
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendActivationLink(to, link, isActivate = true) {
    const url = isActivate
      ? `${process.env.API_URL}/api/mail/activate/${link}`
      : link;

    await this.transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to,
      subject: "Активация аккаунта",
      text: "",
      html: `
        <div>
          <h1>Здавствуйте</h1>
          <div>Для верификации аккаунта перейдите по сссылке</div>
          <a href="${url}">${url}</a>
        </div>
      `,
    });
  }

  async activate(activationLink) {
    // const user = UserModel.findOne({ activationLink });

    // if (!user) {
    //   throw ApiError("Неккоректная ссылка для активации");
    // }

    // user.isVerify = true;
    // await user.save();
    return activationLink;
  }
}

export default new MailService();
