import usermodel from '../model/usermodel.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

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
export { registeruser, loginuser, logoutuser,getprofile ,userauth,updateprofile};