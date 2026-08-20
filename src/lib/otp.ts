import nodemailer from 'nodemailer';

const otpStore = new Map<string, { code: string; expires: number }>();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER || 'placeholder@example.com',
    pass: process.env.SMTP_PASS || 'placeholder_pass',
  },
});

export async function sendOTP(email: string) {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  const expires = Date.now() + 5 * 60 * 1000;

  otpStore.set(email, { code: otp, expires });

  const mailOptions = {
    from: '"First Light Axwell" <noreply@firstlight.com>',
    to: email,
    subject: 'Your Verification Code - First Light Axwell 2026',
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #02010A; background-color: #f9f9f9;">
        <h2 style="color: #0FB6AE;">First Light Axwell 2026</h2>
        <p>Your verification code for ticket registration is:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; padding: 20px; background: #ffffff; border: 1px solid #0FB6AE; display: inline-block; border-radius: 8px;">
          ${otp}
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">This code will expire in 5 minutes.</p>
        <p style="font-size: 12px; color: #666;">If you didn't request this code, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return true;
}

export function verifyOTP(email: string, code: string) {
  const record = otpStore.get(email);
  if (!record) return false;

  if (Date.now() > record.expires) {
    otpStore.delete(email);
    return false;
  }

  if (record.code === code) {
    otpStore.delete(email);
    return true;
  }

  return false;
}
