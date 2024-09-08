import express from 'express'
import userAuth, { isAdmin } from '../middleware/authhandle.js'
import {DeleteBrand , UpdateBrand ,createBrand ,getAllBrand ,getBrand} from '../controller/Brandctrl.js'

const BrandRoute = express.Router()

BrandRoute.post('/' , userAuth ,isAdmin , createBrand)
BrandRoute.post('/update/:id' , userAuth ,isAdmin , UpdateBrand)
BrandRoute.delete('/:id' ,userAuth ,isAdmin ,DeleteBrand)
BrandRoute.get('/:id' ,userAuth ,isAdmin , getBrand)
BrandRoute.get('/' ,userAuth ,isAdmin ,getAllBrand )
export default BrandRoute