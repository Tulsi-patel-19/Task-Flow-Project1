import user from "../models/User.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("REGISTER DATA:", {
            name,
            email,
            password
        });

        // check required fields

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "please provide name , email , and password ",
            });
        }

        // check if user already exist
        const existUser = await user.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // hash password 

        const hashedpassword = await bcrypt.hash(password, 10);

        console.log("DATA BEFORE CREATE:", {
            name,
            email,
            password: hashedpassword
        });

        // create user 
        const User = await user.create({
            name,
            email,
            password: hashedpassword,
        });

        res.status(201).json({
            message: "User registered successfully ",

            user: {
                id: User._id,
                name: User.nmae,
                email: User.email,
                role: User.role,
            },

        });

    }
    catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message,
        });
    }
};

// 2. Login Logic

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "please provide email and password ",

            });
        }

        // find user 
        const User = await user.findOne({ email });

        if (!User) {
            return res.status(401).json({
                message: "Invalid email and password ",
            });
        }

        // compare the entered password with bcrypt password 
        const ispasswordCorrect = await bcrypt.compare(
            password,
            User.password
        );

        if (!ispasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password ",
            });
        }

        res.status(200).json({
            message: "Login Successfully",
            user: {
                id: User._id,
                name: User.name,
                email: User.email,
                role: User.role,
            },
        });

    }
    catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message,
        });
    }
};

export {
    register,
    login
};