const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class JWT {
  static generateJwt(data, exp = "1d") {
    // Include user role in the payload
    const tokenPayload = {
      ...data,
      role: data.role,
    };

    return jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: exp,
    });
  }
}
module.exports = JWT;
