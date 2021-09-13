import axios from 'axios'
import { PORT, USER, LOGIN } from '../helper/apiPaths'

export const fetchLogin = async (credentials) => {
  const { data } = await axios.post(`${PORT}${USER}${LOGIN}`, credentials)
  return data
}

export const fetchRegister = async (credentials) => {
  const { email, password } = credentials

  const { data } = await axios.post(`${PORT}${USER}`, credentials)
  if (data) return await fetchLogin({ email, password })
}
