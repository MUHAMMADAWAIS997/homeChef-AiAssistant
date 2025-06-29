const jwt = require("jsonwebtoken");
const JWT_KEY = "$AdMiN2709@JuTt%";

const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please Authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_KEY);
    req.user = data.user;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ error: "Please Authenticate using valid token", err });
  }
};
module.exports = fetchuser;
