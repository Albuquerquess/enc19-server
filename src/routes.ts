import express, { Request, Response } from "express";

// Controllers
import userController from './controllers/users/usersControllers'
// import contentController from "@controllers/conent/contentController";

const UserController = new userController()
// const ContentController = new contentController()
const router = express.Router()

if (Boolean(process.env.DEV_ENV) == true){
    router.get('/', (request:Request, response:Response) => {
        return response.status(200).send('<h1>Servidor ENC19</h1>')
    })
}

// user
router.post('/user/register', UserController.register)



export default router