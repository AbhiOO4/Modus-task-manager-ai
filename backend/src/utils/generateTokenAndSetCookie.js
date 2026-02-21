import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: '7d'})

    const isProduction = process.env.NODE_ENV === "production"
    res.cookie('token', token, {
        httpOnly: true, //cant be accesed with js avoid xss attacks
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict", //csrf
        maxAge: 7*24*60*60*1000
    });

    return token;
}