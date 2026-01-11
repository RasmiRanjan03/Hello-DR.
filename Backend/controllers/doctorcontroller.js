import doctormodel from "../model/doctormodel.js";
const changeavailability=async(req,res)=>{
    try{
        const {doctorId}=req.body;
        const doctor=await doctormodel.findById(doctorId);
        await doctormodel.findByIdAndUpdate(doctorId,{available:!doctor.available});
        res.status(200).json({success:true,message:'Availability status updated'});     
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Server Error'});
    }
}

const getdoctors=async(req,res)=>{
    try{
        const doctors=await doctormodel.find({available:true}).select('-password,-email');
        res.status(200).json({success:true,doctors});
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Server Error'});
    }
}
const doctorlogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const doctor=await doctormodel.findOne({email,password});
        if(!doctor){
            return res.status(200).json({success:false,message:'Invalid Credentials'});
        }}catch(error){
        console.log(error);
        res.status(500).json({message:'Server Error'});
    }}

export {changeavailability , getdoctors};