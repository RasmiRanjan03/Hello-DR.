import usermodel from '../model/usermodel.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export { registeruser, loginuser, logoutuser,getprofile }