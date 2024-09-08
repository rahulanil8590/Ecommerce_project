import Coupon from '../model/couponModel.js'
import AsyncHandler from 'express-async-handler'
export const createCoupon = AsyncHandler(async (req ,res)=>{
    try {
        const Coupons = await Coupon.create(req.body)
        res.json(Coupons)
    } catch (error) {
        throw new Error(error)
    }
})
export const getAllCoupon = AsyncHandler(async (req ,res)=>{
    const{id} = req.params
    try {
        const newCoupon = await Coupon.findById(id)
        console.log(newCoupon);
        
        res.json(newCoupon)
    } catch (error) {
        throw new Error(error)
    }
})
export const updateCoupon = AsyncHandler(async (req ,res)=>{
    const{id} =req.params
    try {
        const updateCoupon = await Coupon.findByIdAndUpdate(id , req.body ,{new : true})
        res.json(updateCoupon)
    } catch (error) {
        throw new Error(error)
    }
})
export const deleteCoupon = AsyncHandler(async (req ,res)=>{
    const{id} =req.params
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(id)
        res.json(deleteCoupon)
    } catch (error) {
        throw new Error(error)
    }
})