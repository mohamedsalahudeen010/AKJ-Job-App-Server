import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const companySchema=mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    logo:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
        
    },
    credit:{
        type:Number,
        required:true,
        default:200
    }
})

const genAdminAuthToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_CODE_COMPANY)
}

const Company=mongoose.model("company",companySchema)

export{Company,genAdminAuthToken}