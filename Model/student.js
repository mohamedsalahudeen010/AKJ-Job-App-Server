import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const studentSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phone:{
        type:String,       
    },
    password:{
        type:String,
        required:true,
        
    },
    credit:{
        type:Number,
        required:true,
        default : 300
    }
})

const genAuthToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_CODE_STUDENT)
}

const Student=mongoose.model("student",studentSchema)

export{Student,genAuthToken}