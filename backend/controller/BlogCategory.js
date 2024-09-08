import BlogCategory from "../model/BlogCategoryModel.js";
import asyncHandler from  "express-async-handler"

export const BlogCategories = asyncHandler(async(req ,res)=>{
    try {
        const newcategory = await BlogCategory?.create(req.body)
        res.json(newcategory)
    } catch (error) {
        throw new Error(error)
    }
})
export const UpdateBlogCategory = asyncHandler(async(req ,res)=>{
        const{id} = req.params
    try {
        const Upadtecategory = await BlogCategory?.findByIdAndUpdate( id , req.body , {new : true})
        res.json(Upadtecategory)
    } catch (error) {
        throw new Error(error)
    }
})
export const DeleteBlogCategory = asyncHandler(async(req ,res)=>{
    const{id} = req.params
    try {
        const Deletecategory =await BlogCategory?.findByIdAndDelete(id)
        res.json(Deletecategory)
    } catch (error) {
        throw new Error(error)
    }
})
export const getBlogdCategory = asyncHandler(async(req ,res)=>{
    const{id} = req.params
    try {
        const getcategory =  await BlogCategory?.findById(id)
        res.json(getcategory)
    } catch (error) {
        throw new Error(error)
    }
})
export const getAllBlogCategory = asyncHandler(async(req ,res)=>{
    
    try {
        const getAllcategory = await BlogCategory?.find()
        res.json(getAllcategory)
    } catch (error) {
        throw new Error(error)
    }
})