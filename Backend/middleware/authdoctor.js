import doctormodel from "../model/doctormodel.js";
import jwt from "jsonwebtoken"
const authdoctor=async(req,res,next)=>{
    try{
        const dtoken=req.cookies?.dtoken;
    if(!dtoken){
        return res.json({success:false,message:"Please Login gain"})
    }
    const decode=jwt.verify(dtoken,process.env.JWT_SECRET)
    const isfind=await doctormodel.findById(decode.id)
    if(!isfind){
        return res.json({success:false,message:"No Doctor find"})
    }
    return next();
    }catch(err){
        console.log(err)
        return res.json({success:false,message:err})
    }
    
    
}
export default authdoctor