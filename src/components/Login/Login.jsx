// React dependencies
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

// State Managements
import { connect } from 'react-redux'
import { LOGIN, SETACTIVE } from '../../redux/types/userType'

// helper
import validate from '../../helper/validate'

// Components
import Button from '../Button/Button'
import InputForm from '../InputForm/InputForm'

// Custom Hooks
import useForm from '../../hooks/useForm'
import useQueryLogin from '../../hooks/useQueryLogin'

const INITIAL_STATE = {
  email: '',
  password: '',
}

export const INITIAL_PASSWORD_STATE = {
  type: 'password',
  icon: 'SHOW',
}

// Style variable error
export const styles = {
  error: {
    borderColor: '#c92432',
    color: '#c92432',
    background: '#fffafa',
  },
  correct: {},
}

const Login = ({ dispatch }) => {
  const history = useHistory()

  const [credentials, errors, message, handleState, setErrors, setMessage] =
    useForm(INITIAL_STATE, 'login')
  const { data, isLoading, isError, isIdle, isSuccess, refetch } =
    useQueryLogin(credentials)

  const [password, setPassword] = useState(INITIAL_PASSWORD_STATE)

  useEffect(() => {
    let isMounted = true

    if (isMounted && isSuccess) {
      dispatch({ type: LOGIN, payload: data })
      dispatch({ type: SETACTIVE })
      history.push('/home')
    }
    if (isError) setMessage('Email or password not found')

    return () => {
      isMounted = false
    }
  }, [isSuccess, isError])

  // FUNCTIONS

  const showPassord = () => {
    if (password.type === 'password') {
      return setPassword({ ...password, type: 'text', icon: 'HIDE' })
    } else {
      return setPassword(INITIAL_PASSWORD_STATE)
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()

    const errs = validate(credentials, 'login')
    setErrors(errs)

    if (Object.keys(errs).length === 0) {
      if (isIdle) refetch()
    }
  }

  return (
    <div className="loginComponent">
      <div className="loginTitle">
        <h2>
          <span>SIGN IN!</span>
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="loginContainer">
        <div className="loginInput">
          <InputForm
            type="text"
            name="email"
            onChange={handleState}
            title="Email"
            error={errors.email?.help}
            style={errors.email?.status ? styles.error : styles.correct}
          />
        </div>
        <div className="loginInput">
          <InputForm
            type={password.type}
            name="password"
            onChange={handleState}
            title="Password"
            error={errors.password?.help}
            icon={password.icon}
            onClick={() => showPassord()}
            style={errors.password?.status ? styles.error : styles.correct}
          />
        </div>
        <div className="errorMessage">
          <p>{message}</p>
        </div>
        <Button type="submit" isLoading={isLoading}>
          <p>Enjoy!</p>
        </Button>
      </form>
    </div>
  )
}

export default connect()(Login)
