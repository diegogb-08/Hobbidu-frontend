import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    query: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      enabled: false,
    },
    mutations: {},
  },
})
