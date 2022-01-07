import adminConnection from '@database/connections/admin/adminconnection';
import chalk from 'chalk';
import {Request, Response} from 'express';

import jwt from 'jsonwebtoken'

class securityController {

    async authenticationAdmin (request: Request, response: Response, next) {
        const {email, password} = request.body
        
        try{
            const [authenticationAdmin] = await adminConnection('admin')
                .where({
                    email,
                    password
                })
                .select()
                
                if (authenticationAdmin.id == undefined)return response.status(404).json({error: 'user not exists'})
                
                
               const token = jwt.sign({id: authenticationAdmin.id}, process.env.JWT_SECRET, {
                expiresIn: 600
               })
                
                return response.status(200).json({auth: true, token})

    }catch(error){
        console.error(chalk.red('A ERROR OCURRED ON USER REGISTER [ln:15]'))
        console.log(error)
        return response.status(500).json({auth: false, error, message: 'internal error, try again later'})
    }
    }

    async ahthorizationAdmin (request: Request, response: Response, next) {
        const token = request.headers['x-token']

        if (!token) return response.status(401).json({auth: false, message: 'no token provided'})

        jwt.verify(String(token), process.env.JWT_SECRET, (error, decoded) => {
            
            if (error) return response.status(500).json({
                auth: false, 
                message: 'failed to authenticate token', 
                error
            })    


            const refreshToken = jwt.sign({id: decoded.id}, process.env.JWT_SECRET, {
                expiresIn: '600'
            })
    
            request['refreshToken'] = refreshToken
     
            next()
        })


        
    }
}

export default securityController