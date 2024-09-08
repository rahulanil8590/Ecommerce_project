import BrandModel from "../model/BrandModel.js";
import asyncHandler from  "express-async-handler"

export const createBrand = asyncHandler(async(req ,res)=>{
    try {
        const newBrand = await BrandModel?.create(req.body)
        res.json(newBrand)
    } catch (error) {
        throw new Error(error)
    }
})
export const UpdateBrand = asyncHandler(async(req ,res)=>{
        const{id} = req.params
    try {
        const UpadteBrand = await BrandModel?.findByIdAndUpdate( id , req.body , {new : true})
        res.json(UpadteBrand)
    } catch (error) {
        throw new Error(error)
    }
})
export const DeleteBrand = asyncHandler(async(req ,res)=>{
    const{id} = req.params
    try {
        const DeleteBrand =await BrandModel?.findByIdAndDelete(id)
        res.json(DeleteBrand)
    } catch (error) {
        throw new Error(error)
    }
})
export const getBrand = asyncHandler(async(req ,res)=>{
    const{id} = req.params
    try {
        const getBrand =  await BrandModel?.findById(id)
        res.json(getBrand)
    } catch (error) {
        throw new Error(error)
    }
})
export const getAllBrand = asyncHandler(async(req ,res)=>{
    
    try {
        const getAllBrand = await BrandModel?.find()
        res.json(getAllBrand)
    } catch (error) {
        throw new Error(error)
    }
})