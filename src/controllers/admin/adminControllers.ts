import adminConnection from '@database/connections/admin/adminconnection';
import chalk from 'chalk';
import {Request, Response} from 'express';

class adminController {
    async registerNewAdmin(request: Request, response: Response) {
        try {

            const {name, email, password} = request.body
            const adminHash = request.headers['x-admin-hash']
    
    
            if (adminHash !== process.env.ADMIN_HASH) return response.status(403).json({registered: false, message: 'failed to register'})
            await adminConnection('admin').insert({
                name, email, password
            })
    
            return response.status(201).json({registered: true, email})
            
        } catch (error) {
            console.error(chalk.red('A ERROR OCURRED ON USER REGISTER [ln:15]'))
            console.log(error)
            
        }

    }
}

export default adminController