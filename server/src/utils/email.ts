export async function sendOTPEmail(to: string, otp: string) {
  console.log(`\n=== OTP FOR ${to} ===`);
  console.log(`OTP: ${otp}`);
  console.log(`===================\n`);
  return Promise.resolve();
}