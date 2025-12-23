import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import doctormodel from '../model/doctormodel.js';
const addDoctor=async(req,res)=>{
    try{
    const{name,email,password,speciality,experience,degree,about,fees,address}=req.body;
    const image=req.file;
    if(!name || !email || !password || !speciality || !experience || !degree || !about  || !fees || !address || !image)
    {res.json({success:false,message:'All fields are required'});}
    if(!validator.isEmail(email)){
        res.json({success:false,message:'Invalid Email'});
    }
    if(password.length<8){
        res.json({success:false,message:'Password must be at least 6 characters'});
    }
    const salt= await bcrypt.genSalt(10);
    const hashedpassword= await bcrypt.hash(password,salt);
    const imageupload=await cloudinary.uploader.upload(image.path,{
        resource_type:'image',
    });
    const imageUrl=imageupload.secure_url;
    const newdoctor=new doctormodel({
        name,
        email,
        password:hashedpassword,
        speciality,
        experience,
        degree,
        about,
        fees,
        address:JSON.parse(address),
        image:imageUrl  
});
await newdoctor.save();
res.status(201).json({success:true,message:'Doctor added successfully'});
    }
 catch(error){
    console.log(error);
    res.status(500).json({message:'Server Error'});
    Ras
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
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 60 * 60 * 1000
            });
            return res.status(200).json({ success: true, message: 'Admin logged in successfully',token:token });
        } else {
            return res.status(200).json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export{addDoctor,loginAdmin};