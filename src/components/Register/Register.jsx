import React, { useState } from 'react'
import InputForm from '../InputForm/InputForm'
import validate from '../../helper/validate'
import { connect } from 'react-redux'
// import { LOGIN } from '../../redux/types/userType'
import axios from 'axios'
import { PORT, USER, LOGIN } from '../../helper/apiPaths'
import Button from '../Button/Button'
import { SHOWHOBBIES } from '../../redux/types/hobbyType'
import useForm from '../../hooks/useForm'

const INITIAL_STATE = {
  full_name: '',
  user_name: '',
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

const Register = (props) => {
  const [user, errors, message, handleState, setErrors, setMessage] = useForm(
    INITIAL_STATE,
    'register'
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
    const errs = validate(user, 'register')
    setErrors(errs)

    if (Object.keys(errs).length > 0) return

    const body = {
      name: user.full_name,
      user_name: user.user_name,
      email: user.email,
      password: user.password,
    }

    try {
      const result = await axios.post(PORT + USER, body)
      if (result) {
        const dataLogin = {
          email: result.data.email,
          password: user.password,
        }

        const resultLogin = await axios.post(PORT + USER + LOGIN, dataLogin)

        if (resultLogin) {
          props.dispatch({ type: LOGIN, payload: resultLogin.data })
          props.dispatch({ type: SHOWHOBBIES })
        }
      }
    } catch (error) {
      setMessage('User already exist! Try with different email or User name')
    }
  }

  return (
    <div className="registerComponent">
      <div className="registerTitle">
        <h2>
          <span>REGISTER!</span>
        </h2>
      </div>
      <div className="registerContainer">
        <div className="registerInput">
          <InputForm
            type="text"
            name="full_name"
            onChange={handleState}
            title="Full Name"
            error={errors.full_name?.help}
            style={errors.full_name?.status ? styles.error : styles.correct}
          />
        </div>
        <div className="registerInput">
          <InputForm
            type="text"
            name="user_name"
            onChange={handleState}
            title="User Name"
            error={errors.user_name?.help}
            style={errors.user_name?.status ? styles.error : styles.correct}
          />
        </div>
        <div className="registerInput">
          <InputForm
            type="text"
            name="email"
            onChange={handleState}
            title="Email"
            error={errors.email?.help}
            style={errors.email?.status ? styles.error : styles.correct}
          />
        </div>
        <div className="registerInput">
          <InputForm
            type={password.hideShow}
            name="password"
            onChange={handleState}
            title="Password"
            error={errors.password?.help}
            style={errors.password?.status ? styles.error : styles.correct}
            showHide={password.showHide}
            onClick={() => showPassord()}
          />
        </div>
        <div className="errorMessage">
          <p>{message}</p>
        </div>
        <Button onClick={() => toggle()}>
          <p>Continue</p>
        </Button>
      </div>
    </div>
  )
}

export default connect()(Register)
