import express, { Request, Response } from "express";
import multer from 'multer'
import multerConfig from './config/multer'

const router = express.Router()

if (Boolean(process.env.DEV_ENV) == true){
    router.get('/', (request:Request, response:Response) => {
        return response.status(200).send('<h1>Servidor ENC19</h1>')
    })
}


router.post('/contato', multer(multerConfig).single('file'), (request, response) => {
    return response.json({message: 'ok'})
})

export default router