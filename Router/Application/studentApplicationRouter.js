import express from "express"
import Application from "../../Model/application.js";



const router=express.Router();


router.get("/", async (req, res) => {
  const {email}=req.query
    try {
      const jobs = await Application.find({applicantEmail:email});
      if (!jobs) {
        res.status(400).json({ message: "can't get the  data" });
      }
      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });


router.post("/",async(req,res)=>{
  let jobs=await Application.findOne({$and:[{companyName:req.body.companyName},{jobId:req.body.jobId}]})
  if(jobs){
    return res.status(409).json({message:"Job Already Applied"})
  }
  jobs=await new Application(req.body).save()
  return res.status(200).json({message:"Job Created"})
})

  

  export const applicationRouterStudent = router;