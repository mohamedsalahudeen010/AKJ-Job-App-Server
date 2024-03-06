import express from "express"
import bcrypt from "bcrypt"
import { Student } from "../../Model/student.js"


const router=express.Router()

router.post("/",async(req,res)=>{
    try {
       let student= await Student.findOne({email:req.body.email})
       if(student){return res.status(409).json({message:"Email Already Exist"})}
       
       const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(req.body.password,salt);
       student = await new Student({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
        password:hashedPassword,
       }).save()

       return res.status(200).json({message:"SignedUp Successfully"})
    } catch (error) {
      console.log("error",error) 
      return res.status(500).json({message:"Internal Server Error"}) 
    }
})


export const studentSignUpRouter=router