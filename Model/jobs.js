import mongoose from "mongoose";

const jobsSchema=mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    jobId:{
        type:String,
        required:true,
        unique:true
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
    date:{
        type : Date, 
        default : Date.now}
    
},
{ timestamps: true }
)

const Jobs=mongoose.model("jobs",jobsSchema)


export default Jobs