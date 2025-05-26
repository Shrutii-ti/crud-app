// API = Register,VerifyOTP,LoginIn
// register - Collect Name, email and passoword
// Verify - generate Otp - sending otp through nodemailer.

const User = require("../models/user");
const sendEmail = require("../utlis/sendEmail");
const otpGenerator = require("otp-generator");

exports.registerUser = async (name, email, password) => {
  try {
    const existing = await User.findOne({ email });
    if (existing) return { status: 400, message: "User already exists" };

    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const user = await User.create({ name, email, password, otp, otpExpire });
    await sendEmail(email, otp);

    return { status: 201, message: "User registered, OTP sent" };
  } catch (err) {
    return { status: 500, message: "Error registering user", error: err.message };
  }
};

exports.verifyOtp = async (email, otp) => {
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpire < Date.now()) {
    return { status: 400, message: "Invalid or expired OTP" };
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpire = undefined;
  await user.save();

  return { status: 200, message: "OTP verified, user activated" };
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !user.isVerified) return { status: 400, message: "Invalid credentials" };

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return { status: 401, message: "Wrong password" };

  return { status: 200, message: "Login successful" };
};

exports.resend = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    if (user.isVerified) {
      return { status: 400, message: "User already verified" };
    }
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    user.otp = otp;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();
    await sendEmail(email, otp);
    return { status: 200, message: "OTP resent successfully" };
  } catch (err) {
    return {
      status: 500,
      message: "Error resending OTP",
      error: err.message,
    };
  }
};



