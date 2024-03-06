import express from "express";
import bcrypt from "bcrypt";
import { Student, genAuthToken } from "../../Model/student.js";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });

    if (!student) {
      return res.status(404).json({ message: "invalid credentials email" });
    }

    const passwordValidate = await bcrypt.compare(
      req.body.password,
      student.password
    );
    
    if (!passwordValidate) {
      return res.status(404).json({ message: "invalid credentials password" });
    }
    const authToken = genAuthToken(student.id);

   
    return res.status(200)
      .json({
        message: "User logged in successfully",
        token: authToken,
        student,
      });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/one",async(req,res)=>{
  try {
    const student=await Student.findOne({email:req.body.email})
    
    if (!student) {
      return res.status(404).json({ message: "Can not get student" });
    }
    return res.status(200).json({student})
  
  } 
  catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
 
})
export const studentLoginRouter = router;
