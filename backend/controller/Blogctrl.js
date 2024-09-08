
import asyhandler from 'express-async-handler'
import BlogModel from '../model/Blogmodel.js'
import { updateUser } from './Userctrl.js'
export  const createBlog = asyhandler(async (req ,res) =>{
    try {
        const newBlog = await BlogModel.create(req.body)
        res.json(newBlog)
    } catch (error) {
        throw new Error(error)
    }
})
export  const updateBlog = asyhandler(async (req ,res) =>{
    const {id} =req.params
    try {
        const UpdateBlog = await BlogModel.findByIdAndUpdate(id , req.body , {new : true})
        res.json(UpdateBlog)
    } catch (error) {
        throw new Error(error)
    }
})
export  const getBlog = asyhandler(async (req ,res) =>{
    const {id} =req.params
    try {
        const newBlog = await BlogModel.findById(id).populate("likes").populate("Unlikes")
        console.log(newBlog , "blog details");
        
       const UpdateUser= await BlogModel.findByIdAndUpdate(id ,{
            $inc : { numView : 1}
        }, {new : true})
    res.json({newBlog , UpdateUser})
    } catch (error) {
        throw new Error(error)
    }
})
export  const getAllBlog = asyhandler(async (req ,res) =>{
    const {id} =req.params
    try {
        const getAllBlog = await BlogModel.find()
        res.json(getAllBlog)
    } catch (error) {
        throw new Error(error)
    }
})
export  const deleteBlog = asyhandler(async (req ,res) =>{
    const {id} =req.params
    try {
        const deleteBlog = await BlogModel.findByIdAndDelete(id)
        res.json(deleteBlog);
    } catch (error) {
        throw new Error(error);
    }
})
export const likeBlog  = asyhandler(async (req ,res) =>{
    const {blogId} = req.body
    const {userId} = req.body.user
    try {
        const blog =await BlogModel?.findById(blogId)
        const isliked = blog?.isliked
        const alreadyUnliked = blog?.Unlikes?.find((user_id) => user_id?.toString() === userId?.toString())
        if(alreadyUnliked){
            const newblog =await BlogModel?.findByIdAndUpdate(blogId ,{
                $pull : { Unlikes : userId},
                unliked : false
            },{new : true})
            res.json(newblog)
        }
        if(isliked){
            const newblog =await BlogModel?.findByIdAndUpdate(blogId ,{
                $pull : { likes : userId},
                isliked : false
            },{new : true})
            res.json(newblog)
        }else{
            const newblog =await BlogModel?.findByIdAndUpdate(blogId ,{
                $push : { likes : userId},
                isliked : true
            },{new : true})
            res.json(newblog)
        }
    } catch (error) {
        throw new Error(error)
    }
})
export const UnlikeBlog  = asyhandler(async (req ,res) =>{
    const {blogId} = req.body
    const {userId} = req.body.user
    try {
        const blog = await BlogModel?.findById(blogId)
        const isUnliked = blog?.unliked
        const alreadyliked =  blog?.likes?.find((user_id) => user_id?.toString() === userId?.toString())
        if(alreadyliked){
            const newblog = await  BlogModel?.findByIdAndUpdate(blogId ,{
                $pull : { likes : userId},
                isliked : false
            },{new : true})
            res.json(newblog)
        }
        if(isUnliked){
            const newblog = await  BlogModel?.findByIdAndUpdate(blogId ,{
                $pull : { Unlikes : userId},
                unliked : false
            },{new : true})
            res.json(newblog)
        }else{
            const newblog =await BlogModel?.findByIdAndUpdate(blogId ,{
                $push : { Unlikes : userId},
                unliked : true
            },{new : true})

            res.json(newblog)
        }
    } catch (error) {
        throw new Error(error)
    }
})

 export const uploadImages = asyhandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const uploader = (path) => cloudinaryUploadImg(path, "images");
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        console.log(newpath);
        urls.push(newpath);
        fs.unlinkSync(path);
      }
      const findBlog = await Blog.findByIdAndUpdate(
        id,
        {
          images: urls.map((file) => {
            return file;
          }),
        },
        {
          new: true,
        }
      );
      res.json(findBlog);
    } catch (error) {
      throw new Error(error);
    }
  });