import usermodel from '../model/usermodel.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctormodel from '../model/doctormodel.js';
import appointment from '../model/appointmentmodel.js';
import razorpay from 'razorpay';

const registeruser = async (req, res) => {
    try {
        const { name, gmail, password } = req.body;
        if (!name || !gmail || !password) {
            return res.json({ success: false, message: "All fields are required" })
        }
        if (!validator.isEmail(gmail)) {
            return res.json({ success: false, message: "Email is not valid" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "password must be 6 digit" })
        }
        const checkgmail = await usermodel.findOne({ email: gmail })
        if (checkgmail) {
            return res.json({ success: false, message: "Email is already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const newuser = new usermodel({
            name,
            email: gmail,
            password: hashedpassword
        })
        await newuser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        })
        return res.status(200).json({ success: true, message: "User Created Successfully" })
    } catch (err) {
        return res.status(500).err("ERROR")
    }
}
const loginuser = async (req, res) => {
    const { gmail, password } = req.body;
    const user = await usermodel.findOne({ email: gmail })
    if (!user) {
        return res.status(200).json({ success: false, message: "Not user present" })
    }
    const result = await bcrypt.compare(password, user.password)
    if (result) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        })
        return res.status(200).json({ success: true, message: "Login in Successfully" })
    }
    else {
        return res.status(200).json({ success: false, message: "Wrong Password" })
    }
    
    
}

const logoutuser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });

    return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
const getprofile=async(req,res)=>{
    try{
        const token=req.cookies?.token;
        if (!token) {
           return res.json({ success: false, message: 'No token, authorization denied' });
       }
         const decode=jwt.verify(token,process.env.JWT_SECRET)
        const user=await usermodel.findById(decode.id).select('-password');
        if(!user)
            return res.json({ success: false, message: 'User not found' });
        return res.status(200).json({ success: true, user });}
        catch(error){
            console.log('getprofile error:', error);}
        }
const userauth=(req,res)=>{
    try{

        const token=req.cookies?.token;
         if (!token) {
            return res.json({ success: false, message: 'No token, authorization denied' });
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const data=usermodel.findOne({_id:decode})
        if(data){
             return res.status(200).json({ success: true, message: 'Authenticated' });
        }
        else{
             return res.json({ message: 'Unauthorized Login Again' });
        }
    }
    catch(error){
        console.log('authAdmin error:', error);
        // if token verification failed, send 401
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.json({ message: 'Invalid or expired token' });
        }
        return res.status(500).json({ message: 'Server Error' });
    }
    }
    const updateprofile=async(req,res)=>{
        try{
            const token=req.cookies && req.cookies.token;
            if (!token) {
               return res.status(401).json({ success: false, message: 'No token, authorization denied' });
           }

                const decode=jwt.verify(token,process.env.JWT_SECRET)

                // Parse incoming fields (address may be sent as JSON string)
                let {name,dob,gender,address,phone} = req.body || {};
                console.log(name,gender,dob,address)
                const image= req.file;
                if (typeof address === 'string') {
                    try {
                        address = JSON.parse(address);
                    } catch (e) {
                        // leave as string if parse fails
                    }
                }

                if(!name || !dob || !gender || !address || !phone || !image){
                    return res.status(200).json({ success: false, message: 'All fields are required' });
                }
                const imageupload = await cloudinary.uploader.upload(image.path, {
            resource_type: 'image',
        });
        const imageUrl = imageupload.secure_url;
                const user = await usermodel.findByIdAndUpdate(decode.id,{
                    name,
                    dob,
                    gender,
                    address,
                    phone,
                    image: imageUrl
                },{new:true})

                if(!user)
                    return res.status(404).json({ success: false, message: 'User not found' });

                return res.status(200).json({ success: true, user });
        }catch(error){
            console.log('updateprofile error:', error && error.message ? error.message : error)
            return res.status(500).json({ message: 'Server Error' });
        }
    }

    const bookappointment=async(req,res)=>{
        try{
            const{userId,docId,slotDate,slotTime}=req.body;
            const docdata=await doctormodel.findOne({_id:docId}).select('-password')
            if(!docdata.available){
                return res.json({success:false,message:"No Doctor Found"})
            }
            let slots_booked=docdata.slots_booked;
            if(slots_booked[slotDate]){
                if(slots_booked[slotDate].includes(slotTime)){
                    return res.json({success:false,message:"Slot is not available"})
                }
                else{
                    slots_booked[slotDate].push(slotTime)
                }
            }
            else{
                slots_booked[slotDate]=[];
                slots_booked[slotDate].push(slotTime);
            }
            const userdata=await usermodel.findById(userId).select("-password");
            delete docdata.slots_booked;
            const appointmentdata={
                userId,
                docId,
                slotDate,
                slotTime,
                docData:docdata,
                userData:userdata,
                date:Date.now(),
                amount:docdata.fees
            }
            const newappointment=new appointment(appointmentdata)
            await newappointment.save();
            await doctormodel.findByIdAndUpdate(docId,{slots_booked})
            return res.json({success:true,message:"Appointment Booked Successfully"})

        }catch(err){
            console.log(err)
            return res.json({success:false,message:err})
        }
    }
    const getappointment=async(req,res)=>{
        try{
            const{userId}=req.body;
            const appointments=await appointment.find({userId});
            if(!appointments){
                return res.json({success:false,message:"No Appointments Found"})
            }
            return res.json({success:true,appointments})
        }
        catch(err){
            console.log(err)
            return res.json({success:false,message:"ERROR"})
        }
    }
    const cancelappointment=async(req,res)=>{
        try{
            const{userId,appointmentId}=req.body;
            const appointmentdata=await appointment.findOne({_id:appointmentId});
            if(!appointmentdata){
                return res.json({success:false,message:"No Appointment Found"})
            }
            else if(appointmentdata.userId!==userId){
                return res.json({success:false,message:"You are not authorized to cancel this appointment"})
            }
            else{
                await appointment.findByIdAndUpdate(appointmentId,{cancelled:true});
                const docdata=await doctormodel.findById(appointmentdata.docId);
                let slots_booked=docdata.slots_booked;
                let bookedslotsforselcteddate=slots_booked[appointmentdata.slotDate];
                bookedslotsforselcteddate=bookedslotsforselcteddate.filter(slot=>slot!==appointmentdata.slotTime);
                slots_booked[appointmentdata.slotDate]=bookedslotsforselcteddate;
                await doctormodel.findByIdAndUpdate(appointmentdata.docId,{slots_booked});
                return res.json({success:true,message:"Appointment Cancelled Successfully"})
            }
        }
            catch(err){
                console.log(err)
            }}

   
export { registeruser, loginuser, logoutuser,getprofile ,userauth,updateprofile,bookappointment,getappointment,cancelappointment};