exports.getProfile = (req, res) => {
  // req.user is set in authenticate middleware
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
};
