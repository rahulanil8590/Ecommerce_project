import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'
import DBConnection from './config/dbconfig.js'
import route from './routes/index.js'
import {notFound, errorHandler} from './middleware/errHandler.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
dotenv.config()
const app = express()
const _dirname = path.resolve(path.dirname(""))
const PORT = process.env.PORT || 8800
DBConnection()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(_dirname , 'views/build')))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.json({limit : "10mb"}))
app.use(route)
app.use(notFound)
app.use(errorHandler)
app.listen(PORT ,() =>{
    console.log("sever in run in port ");
} )