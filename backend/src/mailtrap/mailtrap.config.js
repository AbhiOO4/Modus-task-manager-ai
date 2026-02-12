import dotenv from 'dotenv'

dotenv.config({quiet:true})

import { MailtrapClient } from 'mailtrap'

export const mailtrapClient = new MailtrapClient({
  token: process.env.API_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

