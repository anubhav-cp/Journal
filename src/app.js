import express, { urlencoded } from 'express'
import router from './routes/index.js'
import cookieParser from 'cookie-parser'


export function createApp(){
    const app = express()

    
    app.use(cookieParser())
    app.use(express.json())
    app.set('view engine', 'ejs')
    app.use(express.urlencoded({extended: true}))
    app.use(router)
    return app
}
