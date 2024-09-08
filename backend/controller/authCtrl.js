//import the Model
import User from "../model/userModel.js";
// import npm module
import JWT from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
// import util methods
import { hashString, CompareString, creteJWT, creteRefreshJWT } from "../utils/index.js"
import { sendverificationEmail } from "../utils/SendEmail.js";

//user regiater functionality
export const register = asyncHandler(
    async (req, res, next) => {
        try {
            const { firstname, lastname, email, mobile, password } = req.body;
            console.log(req.body);
            if (!firstname || !lastname || !email || !mobile) {
                next('Provide require field')
                return
            }
            const UserExit = await User.find({ email })
            console.log(UserExit);
            if (!UserExit) {
                next('user is alredy exist')
                return
            }
            const hashPassword = await hashString(password)
            const user = await User.create(
                {
                    firstname,
                    lastname,
                    email,
                    mobile,
                    password: hashPassword
                }
            )
            sendverificationEmail(user , res)
            res.status(200).json({ user, message: "This is user data " })
         
        } catch (error) {
            console.log(error);
            throw new Error("User data Already exist")
        }
    }
)

// login functionality
export const Login = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body

        try {
            console.log("hello");
            if (!email || !password) {
                throw new Error("email and password credential")
            }
            const user = await User.findOne({ email })
            console.log(user);
            if (!user) {
                throw new Error("email or password is not match")
            }
            const isMatch = await CompareString(password, user?.password)
            const token = await creteJWT(user?.id)
            if (!isMatch) {
                throw new Error('invalid email or password @@@')
            }
            user.password = undefined;
            const refreshToken = await creteRefreshJWT(user?.id)
            const UpdateRefreshToken = await User?.findByIdAndUpdate(user?.id, {
                refreshToken: refreshToken
            }, { new: true })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000
            })

            res.status(201).json({
                success: true,
                message: "Login Succesfully",
                user,
                token: token
            })
           
        } catch (error) {
            throw new Error('invalid email or password 3 3')
        }
    }
)
// Refresh Functionality 
export const Refresh = asyncHandler(
    async (req, res) => {
        try {
            const cookie = req.cookies
            if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies')
            const refresh_Token = cookie?.refreshToken
            const user = await User.findOne({ refreshToken: refresh_Token })
            if (!user) throw new Error('No Refresh Token present in db and not Mattched')
            JWT.verify(refresh_Token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                console.log(decoded)
                if (err || user?.id !== decoded?.userId) throw new Error('There is something wrong with refresh token')
                const accessToken = await creteJWT(user?.id)
                res.json({ 'accessToken': accessToken })
            })
            console.log(cookie);
        } catch (error) {
            throw new Error(error)
        }
    }
)
//Logout functionality
export const Logout = asyncHandler(
    async (req , res) =>{
        try {
            const cookie = req.cookies
            if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies')
            const refresh_Token = cookie?.refreshToken
            const user = await User.findOne({ refreshToken: refresh_Token })
            if(!user){
                res.clearCookie('refreshToken' , {
                    httpOnly: true,
                    success: true
                })
                return res.sendStatus(204)
            }
            await User.findOneAndUpdate({ refreshToken: refresh_Token }, {
                refreshToken : ""
            })
            res.clearCookie('refreshToken' , {
                httpOnly: true,
                success: true
            })
            return res.sendStatus(204)
        } catch (error) {
            throw new Error(error)
        }
    }
)

// Admin  login functionality
export const AdminLogin = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body

        try {
            console.log("hello");
            if (!email || !password) {
                throw new Error("email and password credential")
            }
            const Admin = await User.findOne({ email })
            if(Admin.role !== 'Admin') throw new Error('your are not a admin')
            console.log(Admin);
            if (!Admin) {
                throw new Error("email or password is not match")
            }
            const isMatch = await CompareString(password, Admin?.password)
            const token = await creteJWT(Admin?.id)
            if (!isMatch) {
                throw new Error('invalid email or password @@@')
            }
            Admin.password = undefined;
            const refreshToken = await creteRefreshJWT(Admin?.id)
            const UpdateRefreshToken = await User?.findByIdAndUpdate(Admin?.id, {
                refreshToken: refreshToken
            }, { new: true })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000
            })

            res.status(201).json({
                success: true,
                message: "Login Succesfully",
                Admin,
                token: token
            })
           
        } catch (error) {
            throw new Error('invalid email or password 3 3')
        }
    }
)