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

export {changeavailability}