import usermodel from '../model/usermodel.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registeruser = async(req,res)=>{
    try{
    const {name , gmail,password}=req.body;
    if(!name || !gmail || !password){
        return res.status(401).json({success:false , message:"All fields are required"})
    }
    if(!validator.isEmail(gmail)){
        return res.status(400).json({success:false , message:"Email is not valid"})
    }
    if(password.lenght<8){
       return res.status(400).json({success:false , message:"password must be 6 digit"})
    }
    const checkgmail=await usermodel.findOne({email:gmail})
    if(checkgmail){
        return res.status(400).json({success:false , message:"Email is already exist"})
    }
    const salt= await bcrypt.genSalt(10);
    const hashedpassword= await bcrypt.hash(password,salt);
    const newuser=new usermodel({
        name,
        email:gmail,
        password:hashedpassword
    })
    await newuser.save()
    const token = jwt.sign({ gmail }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000
            })
    return res.status(200).json({success:true , message:"User Created Successfully"})
    }catch(err){
        return res.status(500).err("ERROR")
    }
}

export {registeruser}