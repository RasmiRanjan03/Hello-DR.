import doctormodel from "../model/doctormodel.js";
import appointment from "../model/appointmentmodel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
        const doctors=await doctormodel.find().select('-password,-email');
        res.status(200).json({success:true,doctors});
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Server Error'});
    }
}
const doctorlogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(200).json({success:false,message:'All fields are required'});
        }
        const doctor=await doctormodel.findOne({email});

        if(!doctor){
            return res.status(200).json({success:false,message:'Invalid Credentials'});
        }
        const hashedpassword=doctor.password;
        const ismatch=await bcrypt.compare(password,hashedpassword);
        if(!ismatch){
            return res.status(200).json({success:false,message:'Wrong Email or Password'});
        }
        const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie('dtoken', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path:'/',
            maxAge: 60 * 60 * 1000
        })
        return res.status(200).json({success:true,message:'Login Successful'});
    }catch(error){
        console.log(error);
        res.status(200).json({message:'Server Error'});
    }}
const logoutdoc=(req,res)=>{
    res.clearCookie("dtoken", {
        httpOnly: true,
            secure: true,
            sameSite: "none",
            path:'/'
    });
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
const authdoc=async(req,res)=>{
    try{
        const dtoken=req.cookies?.dtoken;
        if(!dtoken){
            return res.json({success:false,message:"Cokiees Not found"})
        }
        const decode=jwt.verify(dtoken,process.env.JWT_SECRET)
        const isfind=await doctormodel.findById(decode.id)
        if(!isfind){
            return res.json({success:false,message:"Not doc"})
        }
        else{
            return res.json({success:true,message:"Login successfully"})
        }
    }
    catch(err){
        console.log(err)
        return res.json({success:false,message:err})
    }
}
const getappointment=async(req,res)=>{
    try{
        const dtoken=req.cookies?.dtoken;
        const decode=jwt.verify(dtoken,process.env.JWT_SECRET)
        const appointments=await appointment.find({docId:decode.id})
        if(!appointments){
            return res.status(200).jason({success:false,message:"No appointment found"})
        }
        return res.json({success:true,appointments})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err})
    }
}
const cancelappointment=async(req,res)=>{
    try {
        const { appointmentId } = req.body;
        const appointmentdata = await appointment.findOne({ _id: appointmentId });
        if (!appointmentdata) {
            return res.json({ success: false, message: "No Appointment Found" })
        }

        else {
            await appointment.findByIdAndUpdate(appointmentId, { cancelled: true });
            const docdata = await doctormodel.findById(appointmentdata.docId);
            let slots_booked = docdata.slots_booked;
            let bookedslotsforselcteddate = slots_booked[appointmentdata.slotDate];
            bookedslotsforselcteddate = bookedslotsforselcteddate.filter(slot => slot !== appointmentdata.slotTime);
            slots_booked[appointmentdata.slotDate] = bookedslotsforselcteddate;
            await doctormodel.findByIdAndUpdate(appointmentdata.docId, { slots_booked });
            return res.json({ success: true, message: "Appointment Cancelled Successfully" })
        }
    }
    catch (err) {
        console.log(err)
    }
}
const completeappointment=async(req,res)=>{
    try {
        const { appointmentId } = req.body;
        const appointmentdata = await appointment.findOne({ _id: appointmentId });
        if (!appointmentdata) {
            return res.json({ success: false, message: "No Appointment Found" })
        }

        else {
            await appointment.findByIdAndUpdate(appointmentId, { iscompleted: true });
            return res.json({ success: true, message: "Appointment completed Successfully" })
        }
    }
    catch (err) {
        console.log(err)
    }
}
const getdashboarddata=async(req,res)=>{
    try{
        const dtoken=req.cookies?.dtoken;
        const decode=jwt.verify(dtoken,process.env.JWT_SECRET)
        const appointments=await appointment.find({docId:decode.id})
        let earning=0;
        appointments.map((iteam)=>{
            if(iteam.iscompleted || iteam.payment){
                earning+=iteam.amount;
            }
        })
        let patients=[]
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })
        const dashdata={
            earning,
            patients:patients.length,
            appointment:appointments.length,
            latest_appointment:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashdata})

    }catch(err){
        console.log(err)
        res.json({success:false,message:err})
    }
}
const getprofile=async(req,res)=>{
    const dtoken=req.cookies?.dtoken;
    const decode=jwt.verify(dtoken,process.env.JWT_SECRET)
    const docdata=await doctormodel.findById(decode.id).select("-password")
    if(!docdata){
        return res.json({success:true,message:"Doctor Not Found"})
    }
    res.json({success:true,docdata})
}
const updateprofile=async(req,res)=>{
    try{
        const dtoken=req.cookies?.dtoken;
    const decode=jwt.verify(dtoken,process.env.JWT_SECRET)
    const {fees,address,available}=req.body;
    await doctormodel.findByIdAndUpdate(decode.id,{fees,address,available})
    res.json({success:true,message:"Update Successfully"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"ERROR Occured"})
    }
}
export {changeavailability , getdoctors, doctorlogin,authdoc,logoutdoc,getappointment,cancelappointment,completeappointment,
    getdashboarddata,getprofile,updateprofile};
