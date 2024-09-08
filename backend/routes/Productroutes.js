import express from 'express'
import { createProd, DeleteProd, getAllProd, getaProd, rating, UpdateProd, wishList ,Uploadimg } from '../controller/ProductCtrl.js'
import userAuth, { isAdmin } from '../middleware/authhandle.js'
import {uploadPhoto } from '../middleware/uploadimg.js'

const Prodroute = express.Router()

Prodroute.post('/create-prod' ,userAuth,isAdmin, createProd)
Prodroute.post('/upload/:id', userAuth ,isAdmin , uploadPhoto.array('images' ,10) , Uploadimg )
Prodroute.get('/get-prod/:id' ,userAuth, getaProd)
Prodroute.get('/get-all-prod' ,userAuth ,getAllProd)
Prodroute.post('/update-prod/:id' ,userAuth,isAdmin, UpdateProd)
Prodroute.delete('/delete-prod/:id' ,userAuth , isAdmin, DeleteProd)
Prodroute.post('/wishlist' , userAuth , wishList)
Prodroute.post('/rating' , userAuth , rating)
export default Prodroute