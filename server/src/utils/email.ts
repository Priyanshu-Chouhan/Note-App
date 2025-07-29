import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendOTPEmail(to: string, otp: string) {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: 'Your OTP Code - Notes App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Your OTP Code</h2>
          <p>Your OTP code is:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 4px;">${otp}</span>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p style="color: #6b7280; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${to}`);
  } catch (error) {
    console.error('❌ Email failed:', error);
    console.log(`📱 BACKUP OTP for ${to}: ${otp}`);
  }
}