import express, { Request, Response } from "express";

const router = express.Router()

if (Boolean(process.env.DEV_ENV) == true){
    router.get('/', (request:Request, response:Response) => {
        return response.status(200).send('<h1>Servidor ENC19</h1>')
    })
}

router.get('/users/show/', (request, response) => {
    const {id, email} = request.query
    return response.json({message: {
        id: id,
        name: 'Gustavo',
        email: email,
        phone: '84996465565',
        registed_at: '2021-03-26T01:05:02.849Z'
    }})
})


export default router