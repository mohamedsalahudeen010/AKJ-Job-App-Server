import mongoose from "mongoose"


const applicationSchema=mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    jobId:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    },
    minimumCTC:{
        type:Number,
        required:true
    },
    maximumCTC:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    applicantEmail:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    applicantName:{
        type:String,
        required:true    
    },
    applicantPhone:{
        type:String,       
    },
    viewed:{
        type:Boolean,
        default:false
    }
})



const Application=mongoose.model("application",applicationSchema)

export default Application