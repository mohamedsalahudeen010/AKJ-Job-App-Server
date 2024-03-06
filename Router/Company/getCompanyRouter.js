import express from "express";
import bcrypt from "bcrypt";
import { Company} from "../../Model/company.js";



const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const company = await Company.find({});
      if (!company) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(company);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });

  router.post("/credit", async (req, res) => {
    try {
      const company = await Company.find({});
      if (!company) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(company);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });

export const getCompanyRouter = router;
