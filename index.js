import express from "express"
 const app=express();
 import cors from "cors"
 app.use(cors())
 import dotenv from "dotenv"
 dotenv.config();
 import dbConnection from "./DB.js";
import { studentLoginRouter } from "./Router/Student/studentLogInRoute.js";
import { studentSignUpRouter } from "./Router/Student/studentSignUpRoute.js";
import { companyLoginRouter } from "./Router/Company/companyLogInRoute.js";
import { companySignUpRouter } from "./Router/Company/companySignUpRoute.js";
import { jobsRouterCompany } from "./Router/Jobs/jobsCompanyRouter.js";
import { isSignedInCompany } from "./controllers/authCompany.js";
import { jobsStudentRouter } from "./Router/Jobs/jobsStudentRouter.js";
import { isSignedInStudent } from "./controllers/authStudent.js";
import { getCompanyRouter } from "./Router/Company/getCompanyRouter.js";
import { applicationRouterCompany } from "./Router/Application/companyApplicationRouter.js";
import { applicationRouterStudent } from "./Router/Application/studentApplicationRouter.js";



 dbConnection()

 const PORT=process.env.PORT
 app.listen(PORT,()=>{
    console.log(`server is hoisted in ${PORT}`)
 })

 app.use(express.json())
 app.get("/",async(req,res)=>{
    res.send(`Web server Is Hoisted In ${PORT} Port Number`)
 })

app.use("/studentLogin",studentLoginRouter);
app.use("/studentSignUp",studentSignUpRouter);
app.use("/companyLogin",companyLoginRouter);
app.use("/companySignUp",companySignUpRouter);
app.use("/jobAd",isSignedInCompany,jobsRouterCompany)
app.use("/jobs",isSignedInStudent,jobsStudentRouter)
app.use("/company",getCompanyRouter)
app.use("/applicationAd",isSignedInCompany,applicationRouterCompany)
app.use("/application",isSignedInStudent,applicationRouterStudent)



