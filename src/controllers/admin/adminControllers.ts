import adminConnection from '@database/connections/admin/adminconnection';
import {Request, Response} from 'express';

class adminController {
    async registerNewAdmin(request: Request, response: Response) {
        const {name, email, password} = request.body
        const adminHash = request.headers['x-admin-hash']


        if (adminHash !== process.env.ADMIN_HASH) return response.status(403).json({registered: false, message: 'failed to register'})
        await adminConnection('admin').insert({
            name, email, password
        })

        return response.status(201).json({registered: true, email})
    }
}

export default adminController