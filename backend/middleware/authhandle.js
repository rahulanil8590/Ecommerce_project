import JWT from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  console.log(authHeader , "authheader");
  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentication== failed");
  }


  const token = authHeader?.split(" ")[1]
      console.log(token , "token == - = - =");
  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY , (err , res) =>{
      if(err){
        return "token expired"
      }
      if(res){
        return res
      }
    });
    console.log(userToken);
    if(userToken === "token expired"){
      req.body.user = "token expired"
    }else{
      req.body.user = {
        userId: userToken.userId,
      };
    }
    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};
export const isAdmin = asyncHandler( async(req , res , next) =>{
    try {
        const{userId} = req.body.user
        console.log(userId , "==from Is Admin");
        const user = await User.findById(userId)
        if(user?.role !== 'Admin'){
            throw new Error("your are not a admin")
        }
        else{
            next()
        }
        
    } catch (error) {
        throw new Error(error)
       
    }
})
export default userAuth;