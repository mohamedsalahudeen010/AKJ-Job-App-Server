import express from "express"
import Application from "../../Model/application.js";




const router=express.Router();


router.get("/", async (req, res) => {
    try {
      const jobs = await Application.find({});
      if (!jobs) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });


  router.put("/:id", async (req, res) => {
    try {
      const updateJobs= await Application.findOneAndUpdate(
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
        const deleteApplication=await Application.findByIdAndDelete(
            {_id:req.params.id},
        )   
        if(!deleteApplication){return res.status(400).json({message:"Couldn'nt delete your content"})}
        return res.status(200).json({message:"Deleted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

    
})



router.delete("/all",async(req,res)=>{
  try {
      const deleteApplications=await Application.deleteMany(
          {},
      )   
      if(!deleteJobsApplications){return res.status(400).json({message:"Couldn'nt delete your content"})}
      return res.status(200).json({message:"Deleted Successfully"})
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
  }

  
})


  export const applicationRouterCompany = router;