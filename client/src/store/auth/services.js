import axios from 'axios'
import jwtDecode from 'jwt-decode'

import LS from '../../utils/localStorage'

const setAuthHeader = () => {
  const token = LS.get('token')
  return {
    headers: {
      authorization: `bearer ${token}`
    }
  }
}

export const getNewToken = async () => {
  const refreshToken = LS.get('refreshToken')
  const res = await axios.post('/api/users/refresh', { refreshToken })
  return res.data
}

const instance = axios.create()

instance.interceptors.request.use(
  async config => {
    const currentDate = new Date()
    const token = LS.get('token')
    const { exp } = jwtDecode(token)

    if (exp * 1000 < currentDate.getTime()) {
      const { data } = await getNewToken()
      config.headers.authorization = `Bearer ${data.token}`
    }

    return config
  },
  error => Promise.reject(error)
)

export const login = async credentials => {
  const res = await axios.post('/api/users/login', credentials)
  return res.data
}

export const register = async credentials => {
  const res = await axios.post('/api/users/register', credentials)
  return res.data
}

export const logout = async () => {
  const res = await instance.delete('/api/users/logout', setAuthHeader())
  return res.data
}