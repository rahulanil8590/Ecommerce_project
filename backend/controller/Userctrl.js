//import the Model
import User from '../model/userModel.js'
import CartModel from '../model/Cart.js'
import ProductModel from '../model/ProductModel.js'
// import npm module
import asyncHandler from 'express-async-handler'
// import utils methods
import { creteJWT, hashString } from '../utils/index.js'
import {resetPasswordLink} from '../utils/SendEmail.js'
import EmailVerification from '../model/Emailverification.js'
import Resetpassword from '../model/ResetPassword.js'
import Coupon from '../model/couponModel.js'
//fetching All user functionality
export const  getAllUser = asyncHandler(async(req , res) =>{
    try {
        const getUsers = await User.find()
        res.json(getUsers)
        console.log(getUsers);
    } catch (error) {
        throw new Error(error)
    }
})  
// fetching User functionality
export const GetUser = asyncHandler(async(req , res) =>{
        const{id} = req.params
    try {
        const getUser = await User.findById(id)
        res.json(getUser)
        console.log(getUser);
    } catch (error) {
        throw new Error(error)
    }
})  
// Update the user functionality
export const updateUser = asyncHandler(async(req , res) =>{
        const{firstname , lastname , mobile} = req.body
        const {userId} = req.body.user
        console.log("user_id");
try {
    
    if(!(firstname || lastname)){
        throw new Error("Please provide all required fields")
       
    }
    const updateUser = {
        firstname,
        lastname,
        mobile
    }
    const user = await User.findByIdAndUpdate(userId , updateUser , {new :  true})
    console.log(user);
    const token = await creteJWT(user?.id)
    res.json({
        user :  user,
        token: token
    })
} catch (error) {
    throw new Error(error)
}
})  
// Delete user functionality
export const  DeleteUser = asyncHandler(async(req , res) =>{
    const{id} = req.params
    try {
        const getUsers = await User.findByIdAndDelete(id)
        res.json({message : "User delete succesfully "})
      
    } catch (error) {
        throw new Error(error)
    }
})  

// Block the user functionality
export const BlockUser = asyncHandler(async(req , res) =>{
    const{id} = req.params
    
try {
const update = {
    isBlock : true
}
const user = await User.findByIdAndUpdate(id , update , {new :  true})
console.log(user);

res.json({
    message : "User is blocked"
   
})
} catch (error) {
throw new Error(error)
}
})  
//UnBZlock the user functionality
export const UNBlockUser = asyncHandler(async(req , res) =>{
    const{id} = req.params
    
try {
const update = {
    isBlock : false
}
const user = await User.findByIdAndUpdate(id , update , {new :  true})
console.log(user);

res.json({
    message : "User is UNblocked"
   
})
} catch (error) {
throw new Error(error)
}
}) 

export const verifyEmail = asyncHandler(async (req , res) =>{
    const{userId  , token} = req.params
    try {
        const verifyuser = EmailVerification.findOne({userId})
        if(verifyuser){
            const {expries_At , token : hashtoken} = verifyuser
            if(expries_At < Date.now()){
                EmailVerification.findOneAndDelete({ userId })
                    .then(() => {
                        User.findOneAndDelete({ _Id: userId })
                            .then(() => {
                                const message = "Verification token has expired.";
                                res.redirect(`/users/verified?status=error&message=${message}`)
                            })
                            .catch(err => {
                                console.log(err);
                                res.redirect(`/users/verified?status=error&message=`)
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        res.redirect(`/users/verified?message=`)
                    })
            }
        }else {
            //token vaild
            CompareString(token, hashtoken).then(isMatch => {
                if (isMatch) {
                    User.findOneAndUpdate({ _id: userId }, { verified: true })
                        .then(() => {
                            EmailVerification.findOneAndDelete({ userId })
                                .then(() => {
                                    const message = "Email verified successfully.";
                                    res.redirect(`/users/verified?status=success&message=${message}`)
                                })
                                .catch(err => {
                                    const message = "Email verification is failed or link is invaild.";
                                    res.redirect(`/users/verified?status=error&message=${message}`)
                                })
                        })
                }
                else {
                    const message = "Email verification is failed or link is invaild.";
                    res.redirect(`/users/verified?status=error&message=${message}`)
                }

            })
                .catch(err => {
                    console.log(err);
                    res.redirect(`/users/verified?status=error&message=`)
                })
        
    }
    } catch (error) {
        throw new Error(error)
    }
})

export const requestPassword = asyncHandler(async(req ,res) =>{
    const{email} = req.body
    try {
        const user = await  User.findOne({email})
        if(!user){
            throw new Error('Email Address  not  found ')
        }

        const ExitPass = await Resetpassword.findOne({email})
        if(ExitPass){
            if(ExitPass?.expires_At >  Date.now()){
                throw new Error('Reset password link has already been sent tp your email.')
            }
            await Resetpassword?.findOneAndDelete({email})
        }
        resetPasswordLink(user , res)
    } catch (error) {
        throw new Error(error)
    }
})
export const resetPassword = asyncHandler( async (req, res, next) => {
    const { userId, token } = req.params
    console.log(userId, "==userIdofpass", token);
    try {
        //find record
        const user = await User.findById(userId)
        console.log(user, "===resetpassword user");
        if (!user) {
            const message = "Invalid password reset link. Try again";

            res.redirect(`/users/resetpassword?status=error&message=${message}`);

        }
        const resetPassword = await Resetpassword.findOne({ userId })
        if (!resetPassword) {
            const message = "Invalid password reset link. Try again";

            res.redirect(`/users/resetpassword?status=error&message=${message}`);

        }
        const { expires_At, token: resetpass } = resetPassword
        if (expires_At < Date.now()) {
            const message = "Reset Password link has expired. Please try again";

            res.redirect(`/users/resetpassword?status=error&message=${message}`);
        } else {
            const isMatch = await CompareString(token, resetpass);

            if (!isMatch) {
                const message = "Invalid reset password link. Please try again";

                res.redirect(`/users/resetpassword?status=error&message=${message}`);
            } else {

                res.redirect(`/users/resetpassword?type=reset&id=${userId}`);
            }
        }
    } catch (error) {
       throw new Error(error)
    }
})

export const changePassword = asyncHandler(async (req ,res ) => {
    try {
        const {userId  , password} =req.body

        const hashpassword = await hashString(password)

        const user = await User.findOneAndUpdate({_id  : userId} , {password : hashpassword})
        if(user){
            await Resetpassword.findOneAndDelete(userId)
            res.json({_ok : true})
        }
        
    } catch (error) {
        throw new Error(error)
    }
})
    //get wishlist functionality
export const getwishList = asyncHandler( async (req ,res) =>{
        const {userId} = req.body.user
    try {
        const findUser = await User.findById(userId).populate('wishlist')
        res.json(findUser)
    } catch (error) {
        throw new Error(error)
    }
})
// save address functionality
export const Address = asyncHandler( async (req ,res) =>{
    const {userId} = req.body.user
    try {
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          {
            address: req?.body?.address,
          },
          {
            new: true,
          }
        );
        res.json(updatedUser);
      } catch (error) {
        throw new Error(error);
      }
})

export const Cart = asyncHandler(async(req ,res)=>{
    const{cart} = req.body;
    const {userId} = req.body.user;
    let products =[];
    const user = await User?.findById(userId)
    const alreadyExit = await CartModel?.findOne({orderby : user?._id});
    if(alreadyExit){
        alreadyExit?.remove()
    }
    for(let i = 0; i<cart.length; i++){
        let object = {};
        object.product =cart[i].id
        object.count = cart[i].count;
        object.color = cart[i].color;
        const getPrice = await ProductModel?.findById(cart[i]._id).select('price').exec()
        object.price = getPrice.price;
        products.push(object)
    }
    let Carttotal =0;
    for(let i=0; i< products.length; i++){
        Carttotal = Carttotal + products[i].price * products[i].count
    }
    const newCart = await new CartModel({
        products,
        cartTotal :Carttotal,
        orderby : user?._id


    }).save()

    res.json(newCart)
    try {
        
    } catch (error) {
        throw new Error(error)
    }
})

export const GetCart = asyncHandler(async(req , res)=>{
    const{id} = req.params;
    try {
        const findCart = await CartModel?.findOne({orderby : id}).populate('products.product')
        res.json(findCart)
        
    } catch (error) {
        throw new Error(error)
    }
})

export const emptyCart = asyncHandler(async(req , res)=>{
   const {userId} = req.body.user;
    try {
        const RemoveCart = await CartModel?.findOneAndDelete({orderby : userId})
        res.json(RemoveCart)

        
    } catch (error) {
        throw new Error(error)
    }
})

export const applyCoupon = asyncHandler(async(req , res)=>{
    const {userId} = req.body.user;
    const {coupon} = req.body
     try {
        const vaildateCoupon = await Coupon?.findOne({name : coupon})
        if(vaildateCoupon === null){
            throw new Error('invaild Coupon')
        }
         const {products , cartTotal} = await CartModel?.findOne({orderby : userId}).populate('products.product')
         let totalAfterDiscount = (cartTotal - (cartTotal * vaildateCoupon.discount)/100).toFixed(2)
         await CartModel?.findOneAndUpdate({orderby : userId} , totalAfterDiscount , {new : true})
         res.json(totalAfterDiscount)
 
         
     } catch (error) {
         throw new Error(error)
     }
 })