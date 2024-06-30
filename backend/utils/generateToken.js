import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId,resp)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '15d'
    })

    resp.cookie("jwt",token,{
        maxAge: 15* 24 * 60 * 60 * 1000,
        httpOnly: true, //Prevent XSS Attack's ,
        sameSite: "strict"

    })
}

export default generateTokenAndSetCookie;