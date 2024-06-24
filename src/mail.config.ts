import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

@Injectable()
export default class MailService {
  constructor(private readonly configervice: ConfigService) {}
  mailFunction(email, subject, textContent, attach = null) {
    dotenv.config();
    const SibApiV3Sdk = require('sib-api-v3-sdk');
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    defaultClient.authentications['api-key'].apiKey =
      this.configervice.get('BREVO_API_KEY');

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      email: 'your-email@example.com',
      name: 'Your Name',
    };

    sendSmtpEmail.to = [{ email: email, name: 'Recipient Name' }];

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.textContent = textContent;
    // sendSmtpEmail.attachment = [{ content: attach, name: 'Test' }];

    apiInstance.sendTransacEmail(sendSmtpEmail).then();
  }
}
