import express from 'express'
import { createCoupon, deleteCoupon, getAllCoupon, updateCoupon } from '../controller/CoupnCtrl.js'
import userAuth, { isAdmin } from '../middleware/authhandle.js'

const CouponRouter = express.Router()

CouponRouter.post('/' ,userAuth,createCoupon)
CouponRouter.get('/:id' , userAuth , getAllCoupon)
CouponRouter.post('/update' , userAuth , isAdmin , updateCoupon)
CouponRouter.delete('/delete/:id' ,userAuth , isAdmin , deleteCoupon)
export default CouponRouter