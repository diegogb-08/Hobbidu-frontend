import { useQuery } from 'react-query'
import { fetchLogin } from '../services/fetch'

const useQueryLogin = (credentials) => {
  return useQuery(['Login', credentials], () => fetchLogin(credentials), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    enabled: false,
    cacheTime: 0,
  })
}

export default useQueryLogin
