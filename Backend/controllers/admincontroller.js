import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctormodel from '../model/doctormodel.js';
import appointment from '../model/appointmentmodel.js';
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, experience, degree, about, fees, address } = req.body;
        const image = req.file;
        if (!name || !email || !password || !speciality || !experience || !degree || !about || !fees || !address || !image) { return res.json({ success: false, message: 'All fields are required' }); }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid Email' });
        }
        if (await doctormodel.findOne({ email })) {
            return res.json({ success: false, message: 'Doctor with this email already exists' });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 6 characters' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const imageupload = await cloudinary.uploader.upload(image.path, {
            resource_type: 'image',
        });
        const imageUrl = imageupload.secure_url;
        const newdoctor = new doctormodel({
            name,
            email,
            password: hashedpassword,
            speciality,
            experience,
            degree,
            about,
            fees,
            address: JSON.parse(address),
            image: imageUrl
        });
        await newdoctor.save();
        res.status(201).json({ success: true, message: 'Doctor added successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });

    }
}
const loginAdmin = (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        if (email === process.env.admin_email && password === process.env.password) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('atoken', token, {
                httpOnly: true,
                path: "/api/admin",
                secure: false,
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000
            });
            return res.status(200).json({ success: true, message: 'Admin logged in successfully', token: token });
        } else {
            return res.status(200).json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};
const logoutAdmin = (req, res) => {
    res.clearCookie("atoken", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

const alldoctors = async (req, res) => {
    try {
        const doctors = await doctormodel.find({}).select('-password');
        res.status(200).json({ success: true, doctors });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
const allapointments = async (req, res) => {
    try{
        const appointments = await appointment.find({});
        res.status(200).json({ success: true, appointments });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
}}
const cancelappointment = async(req,res)=>{
    try{
        const {appointmentId}=req.body;
        const appnt=await appointment.findByIdAndUpdate(appointmentId,{cancelled:true});
        if(!appnt){
            return res.status(200).json({success:false,message:"Appointment not found"})
        }
        else{
            const docdata=await doctormodel.findById(appnt.docId);
            let slotbooked=docdata.slots_booked
            let bookedslottime=slotbooked[appnt.slotDate];
            bookedslottime=bookedslottime.filter((time)=>time!==appnt.slotTime);
            slotbooked[appnt.slotDate]=bookedslottime;
            docdata.slots_booked=slotbooked;
            await docdata.save();
            return res.status(200).json({success:true,message:"Appointment cancelled successfully"})

        }}catch(error){
        console.log(error);
        res.status(200).json({ success: false, message: 'Server Error' });
}}
export { addDoctor, loginAdmin, logoutAdmin, alldoctors,allapointments,cancelappointment };