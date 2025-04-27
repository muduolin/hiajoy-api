import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "node:path";

export class EmailSender {
  private emailTemplate: string;
  private mailTransport = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "admin@hiajoy.com",
      pass: "8mabw3DrNnXQ",
    },
  });
  private mailOptions = {
    from: "Hiajoy <admin@hiajoy.com>",
    to: "mlin74@gmail.com",
    subject: `Tiawo`,
    html: "",
  };
  constructor(template: string) {
    this.emailTemplate = template;
  }

  public send(to: string, subject: string) {
    this.mailOptions.html = this.emailTemplate;
    this.mailOptions.to = to;
    this.mailOptions.subject = subject;
    this.mailTransport.sendMail(this.mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email successfully sent`);
      }
    });
  }
}

export async function getEmail(name: string, data: any) {
  return await ejs
    .renderFile<string>(path.join(__dirname, "emails/" + name + ".html"), data);
}
