import { useMutation, useQueryClient, q } from 'react-query'
import { fetchLogin, fetchRegister } from '../services/fetch'

const useMutationRegister = () => {
  // eslint-disable-next-line camelcase
  return useMutation((credentials) => fetchRegister(credentials))
}

export default useMutationRegister
