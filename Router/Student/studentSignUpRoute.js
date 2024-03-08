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



router.post("/credit", async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { email: req.body.email },
      { $set:{credit:req.body.credit} },
      { new: true }
    );
    if (!student) {
      res.status(400).json({ message: "can't get the data" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});


export const studentSignUpRouter=router
