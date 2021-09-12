import { useState } from 'react'
import validate from '../helper/validate'

const useForm = (initialState, context = '') => {
  const [state, setSate] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState([])

  const handleState = (e) => {
    setSate({
      ...state,
      [e.target.name]: e.target.value,
    })
    setMessage('')
    if (Object.keys(errors).length > 0) {
      setErrors(
        validate(
          {
            ...state,
            [e.target.name]: e.target.value,
          },
          context
        )
      )
    }
  }

  return [state, errors, message, handleState, setErrors, setMessage]
}

export default useForm
