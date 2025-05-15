import jwt from "jsonwebtoken"

export const generateTokens = (payload) => {

    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if(!accessSecret || !refreshSecret) {
        throw new Error("JWT secrets are missing in environment variables");
    }

    const accessToken = jwt.sign(payload, accessSecret, {expiresIn: "15m"});
    const refreshToken = jwt.sign(payload, refreshSecret, {expiresIn: "7d"});

    return {accessToken, refreshToken}
}

export const verifyRefreshToken = (token) => {
    if (!refreshToken) throw Error("REFRESH_TOKEN_SECRET not defined")

    return jwt.verify(token, refreshSecret)
}