import config from '../config/config';
import sgMail from '@sendgrid/mail';
import ejs from 'ejs';
import nodemailer from 'nodemailer';

class MailService {
  static sendPasswordResetMail = async (passcode: number, email: string): Promise<string> => {
    try {
      const template = await ejs.renderFile(__dirname + '/../templates/forgetPassword.ejs', {
        code: passcode,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: config.gmail.email,
          pass: config.gmail.pass,
        },
      });

      await transporter.sendMail({
        from: config.gmail.email,
        to: email,
        subject: 'Time Tracker Account Password Reset', // Subject line
        html: template,
      });

      return 'Mail with security code has been sent!';
    } catch (error) {
      console.log('error=> ', error);
      return 'Sorry something went wrong';
    }
  };

  static accountCreationMail = async (url: string, email: string): Promise<string> => {
    try {
      const template = await ejs.renderFile(__dirname + '/../templates/accountCreation.ejs', {
        url,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: config.gmail.email,
          pass: config.gmail.pass,
        },
      });

      await transporter.sendMail({
        from: config.gmail.email,
        to: email,
        subject: 'Time Tracker Account Creation Mail',
        html: template,
      });

      return 'Mail has been sent to the user!';
    } catch (error: any) {
      console.log('error=> ', error);
      return 'Sorry something went wrong';
    }
  };

  // static accountCreationMail = async (url: string, email: string) => {
  //   try {
  //     // seems to b html
  //     const template = await ejs.renderFile(__dirname + '/../templates/accountCreation.ejs', {
  //       url,
  //     });

  //     const params = {
  //       Source: 'anees.ahmed@techverx.com',
  //       Destination: {
  //         ToAddresses: [email],
  //       },
  //       Message: {
  //         Subject: {
  //           Charset: 'UTF-8',
  //           Data: 'Time Tracker Account Creation Mail',
  //         },
  //         Body: {
  //           Html: {
  //             Charset: 'UTF-8',
  //             Data: template,
  //           },
  //         },
  //       },
  //     };

  //     const SES = new AWS.SES();

  //     await SES.sendEmail(params)
  //       .promise()
  //       .then((data) => {
  //         console.log('data => ', data);
  //       })
  //       .catch((error) => {
  //         console.log('error => ', error);
  //       });

  //     // await this.sendMail(email, 'Password reset email', template);
  //     return 'Mail has been sent to the user!';
  //   } catch (error: any) {
  //     console.log('error=> ', error);
  //     return 'Sorry something went wrong';
  //   }
  // };

  // static accountCreationMail = async (url: string, email: string) => {
  //   try {
  //     // seems to b html
  //     const template = await ejs.renderFile(__dirname + '/../templates/accountCreation.ejs', {
  //       url,
  //     });

  //     await this.sendMail(email, 'Password reset email', template);
  //     return 'Mail has been sent to the user!';
  //   } catch (error: any) {
  //     console.log('error=> ', error);
  //     return 'Sorry something went wrong';
  //   }
  // };

  static sendMail = async (to: string, subject: string, htmlMessage: string) => {
    try {
      sgMail.setApiKey(config.sendgrid.apikey);
      const message = {
        to,
        from: config.sendgrid.senderEmail,
        subject: subject || 'Email from Time Tracker Application',
        html: `${htmlMessage}`,
      };

      return await sgMail.send(message);
    } catch (error: any) {
      console.error(error);
    }
  };
}

export default MailService;
