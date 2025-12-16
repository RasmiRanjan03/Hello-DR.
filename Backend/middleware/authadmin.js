import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
    try {
        const atoken = req.cookies?.atoken;
        if (!atoken) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decode = jwt.verify(atoken, process.env.JWT_SECRET);

        
        if (decode && decode.email && decode.email === process.env.admin_email) {
            return next();
        }

        return res.status(401).json({ message: 'Unauthorized Login Again' });
    } catch (error) {
        console.log('authAdmin error:', error);
        // if token verification failed, send 401
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        return res.status(500).json({ message: 'Server Error' });
    }
};

export default authAdmin;