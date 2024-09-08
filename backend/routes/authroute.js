// Authentication Route File

import express from 'express'
// imort the Control module
import {AdminLogin, Login, Logout, Refresh, register} from '../controller/authCtrl.js'

const authroute = express.Router()
// Api creations
authroute.post('/register' , register)// register api
authroute.post('admin-login' , AdminLogin)
authroute.post('/login' , Login) // login api
authroute.get('/refresh' , Refresh)// refersh the token to cookie api
authroute.get('/logout' , Logout) // logout api

export default authroute