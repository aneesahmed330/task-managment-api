import config from '../config/config';
import sgMail from '@sendgrid/mail';
import ejs from 'ejs';

class MailService {
  static sendPasswordResetMail = async (passcode: number, email: string): Promise<string> => {
    try {
      const template = await ejs.renderFile(__dirname + '/../templates/forgetPassword.ejs', {
        code: passcode,
      });

      await this.sendMail(email, 'Password reset email', template);
      return 'Mail with security code has been sent!';
    } catch (error) {
      console.log('error=> ', error);
      return 'Sorry something went wrong';
    }
  };

  static sendMail = async (to: string, subject: string, htmlMessage: string) => {
    try {
      sgMail.setApiKey(config.sendgrid.apikey);
      const message = {
        to,
        from: config.sendgrid.senderEmail,
        subject: subject || 'Email from HareMemory',
        html: `${htmlMessage}`,
      };

      return await sgMail.send(message);
    } catch (error: any) {
      console.error(error);
    }
  };
}

export default MailService;
