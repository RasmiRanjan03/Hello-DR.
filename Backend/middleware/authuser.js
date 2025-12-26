import jwt from "jsonwebtoken"
import usermodel from "../model/usermodel.js";

const authuser=(req,res)=>{
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
export default authuser;