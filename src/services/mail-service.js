import nodemailer from "nodemailer";
class MailService {
  credentials;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      service: "gmail",
      auth: {
        type: "OAuth2",
        accessToken: "23597340ehfujb3mb57028orshu",
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
        credentials: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS_REAL,
        },
      },
    });
  }

  async sendActivationLink(to, link, isActivate = true) {
    const url = isActivate
      ? `${process.env.API_URL}/api/mail/activate/${link}`
      : link;

    const hours = new Date().getHours();
    let helloMsg = "Good ";

    if (hours >= 0 && hours < 6) {
      helloMsg += "night!";
    } else if (hours >= 6 && hours < 12) {
      helloMsg += "morning!";
    } else if (hours >= 12 && hours < 18) {
      helloMsg += "afternoon!";
    } else if (hours >= 18) {
      helloMsg += "evening!";
    }

    const sendedInfo = await this.transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to,
      subject: "Account verify",
      text: "",
      html: `
        <div>
          <h1>${helloMsg}</h1>
          <br/>
          <h5>If your don't send verify link, ignore this message</h5>
          <br/>

          <h4>For account verification click on this link</h4>
          <br/>
          <a href="${url}">link</a>
        </div>
      `,
      auth: {
        type: "Bearer",
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log(sendedInfo.messageId);
  }

  async activate(activationLink) {
    const user = UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError("Неккоректная ссылка для активации");
    }

    user.isVerify = true;
    await user.save();
    return activationLink;
  }
}

export default new MailService();
