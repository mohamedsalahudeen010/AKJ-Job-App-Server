import jwt from "jsonwebtoken"
import { Student } from "../Model/student.js";


export const isSignedInStudent=async(req,res,next)=>{
let token;
if(req.headers){
    try {
        token=req.headers["x-auth-token"];
        const decode=jwt.verify(token,process.env.SECRET_CODE_STUDENT)
        console.log(decode)
        req.user=await Student.findById(decode.id).select("-password");
        next()
    } catch (error) {
      return res.status(401).json({message:"Invalid Authorization"})
    }
    if(!token){
        return res.status(400).json({message:"Access denied"})
    }
}
}