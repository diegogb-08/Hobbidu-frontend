// React dependencies
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

// State Managements
import { connect } from 'react-redux'
import { LOGIN, SETACTIVE } from '../../redux/types/userType'

// helper
import validate from '../../helper/validate'

// Components
// import { ADD } from '../../redux/types/hobbyType'
import Button from '../Button/Button'
import InputForm from '../InputForm/InputForm'

// Custom Hooks
import useForm from '../../hooks/useForm'
import { useQuery } from 'react-query'
import { fetchLogin } from '../../services/fetch'

const INITIAL_STATE = {
  email: '',
  password: '',
}
// Style variable error

const styles = {
  error: {
    borderColor: '#c92432',
    color: '#c92432',
    background: '#fffafa',
  },
  correct: {},
}

const Login = (props) => {
  const history = useHistory()

  const [credentials, errors, message, handleState, setErrors, setMessage] =
    useForm(INITIAL_STATE, 'login')
  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    ['Login', credentials.email],
    fetchLogin(credentials),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      enabled: false,
    }
  )

  const [password, setPassword] = useState({
    hideShow: 'password',
    showHide: 'SHOW',
  })

  // FUNCTIONS

  const showPassord = () => {
    if (password.hideShow === 'password') {
      return setPassword({ ...password, hideShow: 'text', showHide: 'HIDE' })
    } else {
      return setPassword({
        ...password,
        hideShow: 'password',
        showHide: 'SHOW',
      })
    }
  }

  const toggle = async () => {
    const errs = validate(credentials, 'login')
    setErrors(errs)

    if (Object.keys(errs).length === 0) {
      if (isSuccess) {
        refetch()
        props.dispatch({ type: LOGIN, payload: data })
        props.dispatch({ type: SETACTIVE })
        history.push('/home')
      }
      if (isError) {
        setMessage('Email or password not found')
      }
    }
  }

  return (
    <div className="loginComponent">
      <div className="loginTitle">
        <h2>
          <span>SIGN IN!</span>
        </h2>
      </div>
      <div className="loginContainer">
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
            type={password.hideShow}
            name="password"
            onChange={handleState}
            title="Password"
            error={errors.password?.help}
            showHide={password.showHide}
            onClick={() => showPassord()}
            style={errors.password?.status ? styles.error : styles.correct}
          />
        </div>
        <div className="errorMessage">
          <p>{message}</p>
        </div>
        <Button onClick={() => toggle()} isLoading={isLoading}>
          <p>Enjoy!</p>
        </Button>
      </div>
    </div>
  )
}

export default connect()(Login)
