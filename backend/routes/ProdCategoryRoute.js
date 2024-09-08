import express from 'express'
import userAuth, { isAdmin } from '../middleware/authhandle.js'
import { DeleteProdCategory, getAllProdCategory, ProdCategory, UpdateProdCategory ,getProdCategory } from '../controller/ProdCategory.js'

const ProdCategoryRoute = express.Router()

ProdCategoryRoute.post('/' , userAuth ,isAdmin , ProdCategory)
ProdCategoryRoute.post('/update/:id' , userAuth ,isAdmin , UpdateProdCategory)
ProdCategoryRoute.delete('/:id' ,userAuth ,isAdmin ,DeleteProdCategory)
ProdCategoryRoute.get('/:id' ,userAuth ,isAdmin , getProdCategory)
ProdCategoryRoute.get('/' ,userAuth ,isAdmin ,getAllProdCategory )
export default ProdCategoryRoute