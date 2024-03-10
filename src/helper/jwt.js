const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")


dotenv.config();

class JWT{
  static generateJwt(data, exp='1d'){
    
    return jwt.sign(data,process.env.JWT_SECRET_KEY,{expiresIn: exp} )
  }
}
module.exports= JWT