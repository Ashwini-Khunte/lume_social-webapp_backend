import jwt from "jsonwebtoken"

export const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
    return { accessToken, refreshToken };
};


export const verifyRefreshToken = (token) => {
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!refreshSecret) throw new Error("REFRESH_TOKEN_SECRET not defined");

    try {
        return jwt.verify(token, refreshSecret);
    } catch (error) {
        throw new Error("Invalid or expired refresh token");
    }
};