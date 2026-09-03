import jwt from "jsonwebtoken";

const generateToken = (userId) =>{

     console.log("Generating token for:", userId);


    // generate token for containing this  userId 
    return jwt.sign(
        {userId : userId},
        process.env.JWT_SECRET,
        {
            // expired after 7 days
            expiresIn :"7d",
        }
    );
};

export default generateToken;