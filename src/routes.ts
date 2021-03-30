import express, { Request, Response } from "express";

// Controllers
import userController from './controllers/users/usersControllers'
import contentController from "./controllers/content/contentControllers";

// multer
import multer from "multer";
import multerConfig from "./config/multer/multerConfig"
import securityController from "@controllers/jwt/securityController";
import adminController from "@controllers/admin/adminControllers";

const UserController = new userController()
const ContentController = new contentController()
const SecurityController = new securityController()
const AdminController = new adminController()

const router = express.Router()

if (Boolean(process.env.DEV_ENV) == true){
    router.get('/', (request:Request, response:Response) => {
        return response.status(200).send('<h1>Servidor ENC19</h1>')
    })
}

// user
router.post('/user/register', UserController.register)

// ADMIN
// admin
router.post('/admin/register', AdminController.registerNewAdmin)
router.post('/admin/login', SecurityController.authenticationAdmin)
// content
router.get('/admin/content/index', SecurityController.ahthorizationAdmin, ContentController.index)
router.get('/admin/content/show', SecurityController.ahthorizationAdmin, ContentController.show)
router.get('/admin/content/show/last', SecurityController.ahthorizationAdmin, ContentController.showLast)
router.post('/admin/content/create', SecurityController.ahthorizationAdmin, multer(multerConfig).single('file'),ContentController.create)
router.delete('/admin/content/delete', SecurityController.ahthorizationAdmin, ContentController.delete)


export default router