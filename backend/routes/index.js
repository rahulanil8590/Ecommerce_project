import express from 'express'
import authroute from './authroute.js'
import Userroute from './userroutes.js'
import Prodroute from './Productroutes.js'
import blogroute from './Blogroute.js'
import ProdCategoryRoute from './ProdCategoryRoute.js'
import BlogCategoryRoute from './BlogCategoryRoute .js'
import BrandRoute from './BrandRoute.js'
import CouponRouter from './CouponRoute.js'
import OrderRoute from './orderRoutes.js'
const route  = express.Router()


route.use('/auth' , authroute)
route.use('/user', Userroute)
route.use('/prod' , Prodroute)
route.use('/blog' ,blogroute)
route.use('/prodCategory' , ProdCategoryRoute)
route.use('/blogCategory' , BlogCategoryRoute)
route.use('/brand' , BrandRoute)
route.use('/coupon' , CouponRouter)
route.use('/order' , OrderRoute)
export default route