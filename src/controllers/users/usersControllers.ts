import chalk from 'chalk'
import {Request, Response} from 'express'
import userConnection from '../../database/connections/user/userConnection'

class usersController {
    async register(request: Request, response: Response) {
        const {name, email, phone} = request.body

        try {
            await userConnection('users').insert({
                name,
                email,
                phone
            })
        } catch (error) {
            console.error(chalk.red('A ERROR OCURRED ON USER REGISTER [ln:15]'))
            console.log(error)
            return response.status(500).json({register: false})
        }
        
        return response.status(200).json({register: true, email})
    }
}

export default usersController