// Authentication Route File

import express from 'express'
// imort the Control module

import { createBlog, getBlog, updateBlog ,likeBlog, UnlikeBlog, getAllBlog, deleteBlog } from '../controller/Blogctrl.js'
import userAuth  from '../middleware/authhandle.js'
const blogroute = express.Router()
// Api creations
blogroute.post('/create-blog' ,userAuth, createBlog)
blogroute.post('/update-blog/:id' ,userAuth, updateBlog)
blogroute.get('/:id' ,userAuth, getBlog)
blogroute.get('/' , userAuth , getAllBlog)
blogroute.post('/like' ,userAuth,likeBlog)
blogroute.delete('/:id' , userAuth , deleteBlog)
blogroute.post('/unlike' ,userAuth , UnlikeBlog)
export default blogroute