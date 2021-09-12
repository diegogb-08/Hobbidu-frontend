import axios from 'axios'
import { PORT, USER, LOGIN } from '../helper/apiPaths'

export const fetchLogin = async (credentials) => {
  const { data } = await axios.post(`${PORT}${USER}${LOGIN}`, credentials)
  return data
}
