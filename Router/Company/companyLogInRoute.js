import express from "express";
import bcrypt from "bcrypt";
import { Company, genAdminAuthToken } from "../../Model/company.js";



const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const company = await Company.findOne({ email: req.body.email });

    if (!company) {
      return res.status(404).json({ message: "invalid credentials email" });
    }

    const passwordValidate = await bcrypt.compare(
      req.body.password,
      company.password
    );
   
    if (!passwordValidate) {
      return res.status(404).json({ message: "invalid credentials password" });
    }
    const authCompanyToken = genAdminAuthToken(company.id);

    console.log("authToken",authCompanyToken)

    return res
      .status(200)
      .json({
        message: "Company logged in successfully",
        token: authCompanyToken,
        company,
      });

     

  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const companyLoginRouter = router;
