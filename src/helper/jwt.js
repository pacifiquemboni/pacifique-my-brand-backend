const jwt = require("jsonwebtoken")

class JWT{
  static generateJwt(data, exp='1d'){
    const secretKey = "a2b3c4d5e6f7g8h9i0j";
    return jwt.sign(data,secretKey,{expiresIn: exp} )
  }
}
module.exports= JWT