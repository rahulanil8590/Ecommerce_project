import express from 'express'
import userAuth, { isAdmin } from '../middleware/authhandle.js'
import { BlogCategories, DeleteBlogCategory, getAllBlogCategory, getBlogdCategory, UpdateBlogCategory } from '../controller/BlogCategory.js'

const BlogCategoryRoute = express.Router()

BlogCategoryRoute.post('/' , userAuth ,isAdmin , BlogCategories)
BlogCategoryRoute.post('/update/:id' , userAuth ,isAdmin , UpdateBlogCategory)
BlogCategoryRoute.delete('/:id' ,userAuth ,isAdmin ,DeleteBlogCategory)
BlogCategoryRoute.get('/:id' ,userAuth ,isAdmin , getBlogdCategory)
BlogCategoryRoute.get('/' ,userAuth ,isAdmin ,getAllBlogCategory )
export default BlogCategoryRoute