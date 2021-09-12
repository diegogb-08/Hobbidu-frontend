import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { UPDATE } from '../../redux/types/userType'
import { customer, port } from '../../tools/apiPaths'
import validate from '../../helper/validate'
import Button from '../Button/Button'
import Footer from '../Footer/Footer'
import InputForm from '../InputForm/InputForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { useHistory } from 'react-router'

const ChangeEmail = (props) => {
  const history = useHistory()

  // AUTHORIZATION

  const token = props.token
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  // HOOKS
  const [credentials, setEmail] = useState({
    oldEmail: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState([])
  const [password, setPassword] = useState({
    hideShow: 'password',
    showHide: 'SHOW'
  })
  const [active, setActive] = useState(false)

  // HANDLERS
  const handleChange = (e) => {
    setEmail({ ...credentials, [e.target.name]: e.target.value, [e.target.name]: e.target.value })
    setMessage('')
    if (Object.keys(errors).length > 0) { setErrors(validate({ ...credentials, [e.target.name]: e.target.value, [e.target.name]: e.target.value }, 'login')) }
  }

  // it detects the changes from the input and on key press Enter, sends the info to multiSearch()
  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.keyCode === 13) {
        toggle()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
    // eslint-disable-next-line
    },[credentials]);

  // Validate that no one can get inside the app without login or registering
  useEffect(() => {
    if (!props.user?._id) { history.push('/') }
    // eslint-disable-next-line
    },[])

  // FUNCTIONS
  const toggle = async () => {
    const errs = validate(credentials, 'login')
    setErrors(errs)

    if (Object.keys(errs).length > 0) return

    const body = {
      oldEmail: credentials.oldEmail,
      newEmail: credentials.email,
      password: credentials.password
    }

    try {
      const result = await axios.put(port + customer + '/change_email/' + props.user._id, body, auth)

      if (result) {
        props.dispatch({ type: UPDATE, payload: result.data })
        setTimeout(() => { setActive(true) }, 500)
        setTimeout(() => { setActive(false) }, 2500)
      } else {
        setMessage('The email you are trying to add already exist')
      }
    } catch (error) {
      setMessage('Email or Password incorrect')
    }
  }

  const showPassord = () => {
    if (password.hideShow === 'password') {
      return setPassword({ ...password, hideShow: 'text', showHide: 'HIDE' })
    } else {
      return setPassword({ ...password, hideShow: 'password', showHide: 'SHOW' })
    }
  }

  return (
        <div className="changeEmailComponent">
            <div className="changeEmailContainer">
                {
                    active &&
                    <div className="check">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                }
                <h2>Change Email</h2>
                <div className="inputEmail">
                    <InputForm
                        type="email"
                        name="oldEmail"
                        length="30"
                        onChange={handleChange}
                        title="Introduce your email"
                        error={message}
                    />
                </div>
                <div className="inputEmail">
                    <InputForm
                        type="email"
                        name="email"
                        length="30"
                        onChange={handleChange}
                        title="Introduce your new email"
                        error={errors.email?.help}
                    />
                </div>
                <div className="inputEmail">
                    <InputForm
                        type={password.hideShow}
                        name="password"
                        onChange={handleChange}
                        title="Password"
                        error={errors.password?.help}
                        showHide={password.showHide}
                        onClick={() => showPassord()}
                    />
                 </div>
                 <div className="buttonEmail">
                     <Button onClick={() => toggle()}>
                         <p>Change Email</p>
                     </Button>
                 </div>
            </div>
            <Footer/>
        </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token
  }
}

export default connect(mapStateToProps)(ChangeEmail)
