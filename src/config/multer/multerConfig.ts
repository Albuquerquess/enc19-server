import { Request } from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import path from 'path'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const storageTypes = {
  local: multer.diskStorage({
    destination: (request: Request, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'))
    },
    filename: (request: Request, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, null)

        const fileName = `${hash.toString('hex')}-content-${file.originalname}`

        cb(null, fileName)
      })
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'enc19-content-cdn',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request: Request, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, null)

        file.nameWithHash = `${hash.toString('hex')}-content-${file.originalname}`

        cb(null, file.nameWithHash)
      })
    }
  })
}

export default {
  dest: path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    // not limits
  },
  fileFilter: (request: Request, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('invalid file type'))
    }
  }
}
