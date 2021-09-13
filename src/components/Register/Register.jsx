import React, { useState, useEffect } from 'react'
import InputForm from '../InputForm/InputForm'
import validate from '../../helper/validate'
import { connect } from 'react-redux'
import axios from 'axios'
import { PORT, USER, LOGIN } from '../../helper/apiPaths'
import Button from '../Button/Button'
import { SHOWHOBBIES } from '../../redux/types/hobbyType'
import useForm from '../../hooks/useForm'
import { INITIAL_PASSWORD_STATE, styles } from '../Login/Login'
import useMutationRegister from '../../hooks/useMutationRegister'

const INITIAL_STATE = {
  full_name: '',
  user_name: '',
  email: '',
  password: '',
}

const Register = ({ dispatch }) => {
  const [user, errors, message, handleState, setErrors, setMessage] = useForm(
    INITIAL_STATE,
    'register'
  )
  const { data, mutate, isError, isSuccess } = useMutationRegister()

  const [password, setPassword] = useState(INITIAL_PASSWORD_STATE)

  // FUNCTIONS

  const showPassord = () => {
    if (password.type === 'password') {
      return setPassword({ ...password, type: 'text', icon: 'HIDE' })
    } else {
      return setPassword(INITIAL_PASSWORD_STATE)
    }
  }

  useEffect(() => {
    let isMounted = true

    if (isMounted && isSuccess) {
      dispatch({ type: LOGIN, payload: data })
      dispatch({ type: SHOWHOBBIES })
    }
    if (isError) setMessage('Email or password not found')

    return () => {
      isMounted = false
    }
  }, [isSuccess, isError])

  const handleSubmit = async (ev) => {
    ev.preventDefault()

    const errs = validate(user, 'register')
    setErrors(errs)

    if (Object.keys(errs).length > 0) return

    const body = {
      name: user.full_name,
      user_name: user.user_name,
      email: user.email,
      password: user.password,
    }
    mutate(body)
  }

  return (
    <div className="registerComponent">
      <div className="registerTitle">
        <h2>
          <span>REGISTER!</span>
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="registerContainer">
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
            type={password.type}
            name="password"
            onChange={handleState}
            title="Password"
            error={errors.password?.help}
            style={errors.password?.status ? styles.error : styles.correct}
            icon={password.icon}
            onClick={() => showPassord()}
          />
        </div>
        <div className="errorMessage">
          <p>{message}</p>
        </div>
        <Button type="submit">
          <p>Continue</p>
        </Button>
      </form>
    </div>
  )
}

export default connect()(Register)
