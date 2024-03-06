import express from "express"
import Jobs from "../../Model/jobs.js";



const router=express.Router();


router.get("/", async (req, res) => {
  const {company}=req.query
    try {
      const jobs = await Jobs.find({companyName:company});
      if (!jobs) {
        res.status(400).json({ message: "can't get the Actor data" });
      }
      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });


router.post("/",async(req,res)=>{
  let jobs=await Jobs.findOne({$and:[{name:req.body.name},{jobId:req.body.jobId}]})
  if(jobs){
    return res.status(409).json({message:"Job Already Exist"})
  }
  jobs=await new Jobs(req.body).save()
  return res.status(200).json({message:"Job Created"})
})

  router.put("/:id", async (req, res) => {
    try {
      const updateJobs= await Jobs.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!updateJobs) {
        return res.status(400).json({ message: "Couldn'nt update your content" });
      }
      return res.status(200).json("updated Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  router.delete("/:id",async(req,res)=>{
    try {
        const deleteJob=await Jobs.findByIdAndDelete(
            {_id:req.params.id},
        )   
        if(!deleteJob){return res.status(400).json({message:"Couldn'nt delete your content"})}
        return res.status(200).json({message:"Deleted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

    
})



router.delete("/all",async(req,res)=>{
  try {
      const deleteJobs=await Jobs.deleteMany(
          {},
      )   
      if(!deleteJobs){return res.status(400).json({message:"Couldn'nt delete your content"})}
      return res.status(200).json({message:"Deleted Successfully"})
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
  }

  
})


  export const jobsRouterCompany = router;