
import ProductModel from "../model/ProductModel.js";
import asyncHandler from 'express-async-handler';
import slugify from 'slugify'
import User from "../model/userModel.js";
import {CloudinaryImg ,Cloudinarydelete} from '../utils/cloudinaryConfig.js'
export const createProd =asyncHandler(
    async(req ,res) =>{
        try {
            if(req.body.title){
                req.body.slug = slugify(req.body.title)
            }
            const newProduct = await ProductModel.create(req.body)
            res.json(newProduct)
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const getaProd =asyncHandler(
    async(req ,res) =>{
        const{id} =req.params
        try {
            const Product = await ProductModel.findById(id)
            res.json(Product)
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const getAllProd =asyncHandler(
    async(req ,res) =>{
        
        try {
            //filtering
            const queryobj ={...req.query}
            const excludeField = ['page' , 'sort' , 'limit' , 'fields']
             excludeField.forEach(el => delete queryobj[el])
             let queryStr = JSON.stringify(queryobj)
             queryStr =queryStr.replace(/\b(gte|gt|lte|lt)\b/g ,(match) =>`$${match}`)
             let query = ProductModel.find(JSON.parse(queryStr))
             //sorting
             if(req.query.sort){
                const sortBy = req.query.sort.split(',').join('')
                query = query.sort(sort)
             }else{
                query = query.sort('-createdAt')
             }
             // limiting
             if(req.query.fields){
                const fieldsBy = req.query.fields.split(',').join('')
                query = query.select(fieldsBy)
            }else{
                query = query.select('-__v')
            }
            //pagination
                const page = req.query.page;
                const limit = req.query.limit;
                const skip = (page -1) * limit
                console.log(skip);
                query = query.skip(skip).limit(limit)
                if(req.query.page){
                    const pageCount = await ProductModel.countDocuments()
                    if(skip >= pageCount) throw new Error('page is not exist')          
                }
             const product = await query
            res.json(product)
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const UpdateProd =asyncHandler(
    async(req ,res) =>{
        const { id} = req.params
        console.log(id);
        try {
            if(req.body.title){
                req.body.slug = slugify(req.body.title)
            }
            const UpdatedProduct = await ProductModel.findByIdAndUpdate(id , req.body , {new : true})
            res.json(UpdatedProduct)
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const DeleteProd =asyncHandler(
    async(req ,res) =>{
        const { id} = req.params
        try {
            if(req.body.title){
                req.body.slug = slugify(req.body.title)
            }
            const DeleteProduct = await ProductModel.findByIdAndDelete(id)
            res.json(DeleteProduct)
        } catch (error) {
            throw new Error(error)
        }
    }
)

export const wishList  = asyncHandler(async (req ,res) =>{
    const {ProdId} = req.body
    const {userId} = req.body.user
    try {
        const user =await User?.findById(userId)
        
        const alreadyInWishList =  user?.wishlist?.find((_id) => _id?.toString() === ProdId?.toString())
        if(alreadyInWishList){
            const newWishlist =await User?.findByIdAndUpdate(userId ,{
                $pull : { wishlist :ProdId},
                
            },{new : true})
            res.json(newWishlist)
        }
       else{
            const newUser =await User?.findByIdAndUpdate(userId ,{
                $push : { wishlist : ProdId},
            },{new : true})
            res.json(newUser)
        }
    } catch (error) {
        throw new Error(error)
    }
})

export const rating =asyncHandler(async(req ,res)=>{
    const {userId} = req.body.user;
    const{star , proId , comment} = req.body
    try {
        const product = await ProductModel?.findById(proId)
        const alreadyRated = product?.ratings?.find((user_Id) => user_Id.postedby.toString() === userId )
        if(alreadyRated){
            const updateRating = await ProductModel?.updateOne({
                ratings : {
                    $eleMatch : alreadyRated
                },
            },
               { $set : {
                    "ratings.$.star" : star,
                    "ratings.$.comment" : comment
                }
            },{new :true}
            )
           
        }else{
            const rateProduct = await ProductModel?.findByIdAndUpdate(proId ,{
                $push : {
                    ratings : {
                        star : star,
                        comment : comment,
                        postedby : userId
                    }
                }
            },{new : true})
            
        }
        const getallrating = await ProductModel?.findById(proId)
        let totalrating = getallrating?.ratings?.length
        let ratingsum = getallrating.ratings?.map((item) => item.star).reduce((prev , curr) => prev + curr ,0)
        let actualRating= Math.round(ratingsum/totalrating)
        let finalProductrating =  await ProductModel?.findByIdAndUpdate(proId , {
            totalrating : actualRating
        } , {new : true})
        res.json(finalProductrating)
    } catch (error) {
        throw new Error(error)
    }
})

export const Uploadimg =asyncHandler(async (req ,res) =>{
    try {
        console.log("inside the Uploader");
        
        const uploader = (path) =>CloudinaryImg(path, "images");
        const urls = [];
        const files = req.files;
        console.log(files);
        
        for (const file of files) {
          const { path } = file;
          const newpath = await uploader(path);
          console.log(newpath);
          urls.push(newpath);
          fs.unlinkSync(path);
        }
        const images = urls.map((file) => {
          return file;
        });
        res.json(images);
    } catch (error) {
        throw new Error(error);
    }
})