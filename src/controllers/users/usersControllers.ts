import {Request, Response} from 'express'
import userConnection from '../../database/connections/userConnection'
import moment from 'moment';

class usersController {
    async register(request: Request, response: Response) {
        const {name, email, phone} = request.body
        const registed_at = moment().utc().format();

        try {
            await userConnection('users').insert({
                name,
                email,
                phone,
                registed_at
            })     
        } catch (error) {
            return response.status(500).json({register: false})
        }
        
        return response.status(200).json({register: true})
    }
}

export default usersController