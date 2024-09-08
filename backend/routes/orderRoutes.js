import express from 'express'
import userAuth, { isAdmin } from '../middleware/authhandle.js'
import { createOrder, getAllOrders, getOrderByUserId, getOrders, updateOrderStatus } from '../controller/orderCtrl.js'


const OrderRoute = express.Router()

OrderRoute.post('/' , userAuth , createOrder )
OrderRoute.post('/update' , userAuth , updateOrderStatus )
OrderRoute.get('/:id' , userAuth , getOrders )
OrderRoute.get('/' , userAuth , getAllOrders)
OrderRoute.get('/getOrderbyUserId' , userAuth, getOrderByUserId)




export default OrderRoute