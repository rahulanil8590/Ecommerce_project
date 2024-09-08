// User FIlE
import express from 'express'
import path from 'path'
// imort the Control module
import { BlockUser, DeleteUser, getAllUser, GetUser, UNBlockUser, updateUser, verifyEmail ,getwishList , Address, Cart, GetCart, emptyCart } from '../controller/Userctrl.js'
// middleware
import userAuth, { isAdmin } from '../middleware/authhandle.js'

const Userroute = express.Router()
const _dirname = path.resolve(path.dirname(""))
// APIS
Userroute.get('/verify/:userId/:token' , verifyEmail)
Userroute.get('/all-user' ,userAuth , getAllUser)
Userroute.get('/:id', userAuth,isAdmin, GetUser)
Userroute.get('/getwishlist' ,userAuth,getwishList);
Userroute.post('/update-address' , userAuth , Address)
Userroute.post('/update-user',userAuth , updateUser)
Userroute.post('/block-user/:id', userAuth,isAdmin, BlockUser)
Userroute.post('/unblock-user/:id',userAuth , isAdmin , UNBlockUser)
Userroute.delete('/:id' , userAuth ,DeleteUser)
Userroute.post('/cart' , userAuth , Cart);
Userroute.get('/cart' , userAuth , GetCart)
Userroute.delete('/cart' , userAuth , emptyCart)
Userroute.get("/verified/" ,(req, res) =>{
    res.sendFile(path.join(_dirname , "./views/build" , "index.html"));
})
export default Userroute