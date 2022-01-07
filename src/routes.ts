import express, { Request, Response } from 'express'

// Controllers
import userController from './controllers/users/usersControllers'
import contentController from './controllers/content/contentControllers'

// multer
import multer from 'multer'
import multerConfig from './config/multer/multerConfig'
import securityController from '@controllers/jwt/securityController'
import adminController from '@controllers/admin/adminControllers'

const UserController = new userController()
const ContentController = new contentController()
const SecurityController = new securityController()
const AdminController = new adminController()

const router = express.Router()


router.get('/', (request:Request, response:Response) => {
  return response.status(200).send(`<h1>Servidor ENC19 - ${new Date().toLocaleDateString()}</h1>`)
})


// user
router.post('/user/register', UserController.register)

// ADMIN
// admin
router.post('/admin/register', AdminController.registerNewAdmin)
router.post('/admin/login', SecurityController.authenticationAdmin)
// content
router.get('/admin/content/index', ContentController.index)
router.get('/admin/content/show', ContentController.show)
router.get('/admin/content/show/last', ContentController.showLast)
router.get('/admin/content/show/search', ContentController.search)
router.post('/admin/content/create', multer(multerConfig).single('file'), ContentController.create)
router.delete('/admin/content/delete', ContentController.delete)

// Quanto a autenticação for implementada, adicionar middleware securityController.ahthorizationAdmin on all content routers

export default router
