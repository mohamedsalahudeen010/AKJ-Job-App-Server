import express from "express"
import Jobs from "../../Model/jobs.js";

const router=express.Router();


router.get("/", async (req, res) => {
    try {
      const jobs = await Jobs.find({});
      if (!jobs) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });

  export const jobsStudentRouter = router;

