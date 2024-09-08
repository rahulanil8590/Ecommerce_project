import prodCategory from "../model/ProdCategoryModel.js";
import asyncHandler from  "express-async-handler"

export const ProdCategory = asyncHandler(async(req ,res)=>{
    try {
        const newcategory = await prodCategory?.create(req.body)
        res.json(newcategory)
    } catch (error) {
        throw new Error(error)
    }
})
export const UpdateProdCategory = asyncHandler(async(req ,res)=>{
        const{id} = req.params
    try {
        const Upadtecategory = await prodCategory?.findByIdAndUpdate( id , req.body , {new : true})
        res.json(Upadtecategory)
    } catch (error) {
        throw new Error(error)
    }
})
export const DeleteProdCategory = asyncHandler(async(req ,res)=>{
    const{id} = req.params
    try {
        const Deletecategory =await prodCategory?.findByIdAndDelete(id)
        res.json(Deletecategory)
    } catch (error) {
        throw new Error(error)
    }
})
export const getProdCategory = asyncHandler(async(req ,res)=>{
    const{id} = req.params
    try {
        const getcategory =  await prodCategory?.findById(id)
        res.json(getcategory)
    } catch (error) {
        throw new Error(error)
    }
})
export const getAllProdCategory = asyncHandler(async(req ,res)=>{
    
    try {
        const getAllcategory = await prodCategory?.find()
        res.json(getAllcategory)
    } catch (error) {
        throw new Error(error)
    }
})