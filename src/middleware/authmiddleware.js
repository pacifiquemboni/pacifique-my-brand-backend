const jwt = require("jsonwebtoken")

class authMiddleware{
  static async isAuthenticated(req, res, next){
    try{
      const {authorization} = req.headers;
    if(!authorization){
      return res.status(401).json({
        status: "fail",
        message: "Missing authorisation token",
      });
    }
    const token = authorization.split(" ")[1];
    if(!token){
      return res.status(401).json({
        status: "fail",
        message: "Unathorised action",
      });
    }
    const secretKey = "a2b3c4d5e6f7g8h9i0j";
    const user = jwt.verify(token, secretKey);
    req.user = user;

    next();
    }catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
    
  }
  //check role
  static async checkRole(req,res,next){
    try{
      const user = req.user;
      if(user.role == "admin"){
        return next();
      }
      return res.status(403).json({
        status: "fail",
        message: "You do not have a permission to perform this task",
      });
    }
    catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = authMiddleware;