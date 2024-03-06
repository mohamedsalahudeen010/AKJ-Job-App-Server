import express from "express"
import bcrypt from "bcrypt"
import { Company } from "../../Model/company.js"


const router=express.Router()

router.post("/",async(req,res)=>{
    try {
       let company= await Company.findOne({email:req.body.email})
       if(company){return res.status(409).json({message:"Email Already Exist"})}
       
       const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(req.body.password,salt);
       company = await new Company({
        companyName:req.body.companyName,
        logo:req.body.logo,
        email:req.body.email,
        password:hashedPassword,
       }).save()

       return res.status(200).json({message:"SignedUp Successfully"})
    } catch (error) {
      console.log("error",error) 
      return res.status(500).json({message:"Internal Server Error"}) 
    }
})


export const companySignUpRouter=router