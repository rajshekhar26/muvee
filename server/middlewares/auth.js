import jwt from 'jsonwebtoken'

import config from '../utils/config.js'
import HttpError from '../utils/http-error.js'
import redisClient from '../utils/connect-redis.js'

const verifyToken = async (req, _res, next) => {
  const authorization = req.get('authorization')

  try {
    if (!authorization) throw new HttpError(401, 'token missing')

    const token = authorization.substring(7)

    const { id } = jwt.verify(token, config.TOKEN_SECRET)
    req.userId = id

    next()
  } catch (err) {
    next(err)
  }
}

const verifyRefreshToken = async (req, _res, next) => {
  const { refreshToken } = req.body

  try {
    if (!refreshToken) throw new HttpError(401, 'token missing')

    const { id } = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET)
    req.userId = id

    const tokenInRedis = await redisClient.get(id)

    if (!(tokenInRedis && tokenInRedis === refreshToken)) {
      throw new HttpError(403, 'invalid token')
    }

    next()
  } catch (err) {
    next(err)
  }
}

export { verifyToken, verifyRefreshToken }
