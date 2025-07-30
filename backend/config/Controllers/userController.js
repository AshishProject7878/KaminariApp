import User from "../Models/User.js";
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword) {
        return res.status (400).json({ message: "Password Doesn't Match" });
    }

    try {
        const exisitingUser = await User.findOne({ email });
        if(exisitingUser){
            return res.status(400).json({ message: "User Already Exists" });
        }

        const newUser = await User.create({
            username,
            email,
            password,
            confirmPassword
        });

        const token = generateToken(newUser._id);

        res.status(201).json({ token, user: { id: newUser._id, username, email } });
    } catch (error) {
        res.status(500).json({ message: "Register Server Error", error: error.message });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email }).select('+password'); // Include password in the query
        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = generateToken(user._id);
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Login Server Error", error: error.message });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({ message: "User Not Found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};