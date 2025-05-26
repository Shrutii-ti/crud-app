//API = Register,VerifyOTP,LoginIn

const authService = require("../services/authService");


exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const response = await authService.registerUser(name, email, password);
  res.status(response.status).json(response);
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const response = await authService.verifyOtp(email, otp);
  res.status(response.status).json(response);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const response = await authService.loginUser(email, password);
  res.status(response.status).json(response);
};

exports.resendOTP = async (req, res) => {
    console.log("Hello");
    const {email} = req.body;
    const response = await authService.resend(email);
    res.status(response.status).json(response);
}
