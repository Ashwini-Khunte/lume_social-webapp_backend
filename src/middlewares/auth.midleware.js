import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    
    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const token = req.cookies?.token;

    if(!token) {
        return res.status(401).json({
            error: "Unauthorized: Token missing"
        });
    }

    try {
        if (!accessSecret) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined")
        }

        const decoded = jwt.verify(token, accessSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            error: "Invalid or expired token"
        })
    }
}