import { Request, Response } from 'express'
import contentConnection from '@database/connections/content/contentConnection'
import aws from 'aws-sdk'

const s3 = new aws.S3()

class contentController {
  async create (request: Request, response: Response) {
    const { originalname, size, nameWithHash, location: url = '' } = request.file
    const { type, category, title, desc } = request.query

    const trx = await contentConnection.transaction()

    try {
      const [content_id] = await trx('content').insert({
        nameWithHash,
        originalname,
        size,
        url
      })

      await trx('content_desc').insert({
        type,
        category,
        title,
        desc,
        content_id
      })

      await trx.commit()
    } catch (error) {
      return response.status(500).json({ create: false, error: error })
    }

    return response
    // .header('X-refresh-token', request.refreshToken)
      .json({ originalname, size, nameWithHash, url })
  }

  async delete (request: Request, response: Response) {
    const { id, nameWithHash } = request.query

    if (process.env.STORAGE_TYPE === 's3') {
      s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: String(nameWithHash)
      }, (error, data) => {
        if (error) {
          return response.status(500)
            .json({ delete: false, error })
        }
      }).promise()
    } else {
      // delete local file
    }
    try {
      const deleted = await contentConnection('content')
        .where('id', `${id}`)
        .limit(1)
        .delete()

      return response
      // .header('X-refresh-token', request.refreshToken)
        .json({ deleted })
    } catch (error) {
      return response.status(500).json({ delete: false, error })
    }
  }

  async show (request: Request, response: Response) {
    const { id } = request.query

    try {
      const content = await contentConnection('content')
        .join('content_desc', 'content.id', '=', 'content_desc.content_id')
        .where('content.id', `${id}`)
        .select([
          'content_desc.id',
          'content_desc.title',
          'content_desc.type',
          'content_desc.category',
          'content.url',
          'content_desc.desc',
          'content.nameWithHash'
        ])
      if (!content[0]) return response.status(404).json({ message: 'content not found' })

      return response.status(200)
      // .header('X-refresh-token', request.refresh)
        .json(content)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  async index (request: Request, response: Response) {
    const { page = 1, type, category } = request.query

    const [count] = await contentConnection('content').count()

    const contents = await contentConnection('content')
      .join('content_desc', 'content.id', '=', 'content_desc.content_id')
      .where('content_desc.category', `${category}`)
      .where('content_desc.type', `${type}`)
      .limit(10)
      .offset((Number(page) - 1) * 10)
      .select([
        'content_desc.id',
        'content_desc.title',
        'content_desc.type',
        'content_desc.category',
        'content.url',
        'content_desc.desc',
        'content.nameWithHash'
      ])

    return response.header('X-Total-Count', String(count['count(*)']))
    // .header('X-refresh-token', request.refreshToken)
      .status(200)
      .json(contents)
  }

  async showLast (request: Request, response: Response) {
    const { type } = request.query

    try {
      const lastContent = await contentConnection('content_desc')
        .join('content', 'content.id', '=', 'content_desc.content_id')
        .where('type', String(type))
        .limit(1)
        .orderBy('content.id', 'desc')
        .select([
          'content_desc.id',
          'content_desc.title',
          'content_desc.type',
          'content_desc.category',
          'content.url',
          'content_desc.desc',
          'content.nameWithHash'
        ])

      return response.status(200)
      // .header('X-refresh-token', request.refreshToken)
        .json(lastContent)
    } catch (error) {
      return response.status(403).json({ error })
    }
  }

  async search (request: Request, response: Response) {
    const { search, type, category } = request.query

    try {
      const searhContent = await contentConnection('content_desc')
        .join('content', 'content.id', '=', 'content_desc.content_id')
        .where('content_desc.type', String(type))
        .where('content_desc.category', String(category))
        .orWhere('content_desc.title', 'like', `%${String(search)}%`)
        .orWhere('content_desc.desc', 'like', `%${String(search)}%`)
        .orderBy('content.id', 'desc')
        .select([
          'content_desc.id',
          'content_desc.title',
          'content_desc.type',
          'content_desc.category',
          'content.url',
          'content_desc.desc',
          'content.nameWithHash'
        ])

      return response.status(200)
      // .header('X-refresh-token', request.refreshToken)
        .json(searhContent)
    } catch (error) {
      return response.status(403).json({ error })
    }
  }
}

export default contentController
