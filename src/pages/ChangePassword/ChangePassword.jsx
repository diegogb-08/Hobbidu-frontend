import React, { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import axios from "axios"
import { connect } from "react-redux"
import validate from "../../helper/validate"
import Button from "../../components/Button/Button"
import InputForm from "../../components/InputForm/InputForm"
import { USER, port } from "../../helper/apiPaths"
import { UPDATE } from "../../redux/types/userType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import { useHistory } from "react-router"

const ChangePassword = (props) => {
  const history = useHistory()

  // AUTHORIZATION

  const token = props.token
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // HOOKS
  const [password, setPassword] = useState({
    oldPassword: "",
    password: "",
    repeatPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState([])
  const [active, setActive] = useState(false)

  // HANDLERS
  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    })
    setMessage("")
    if (Object.keys(errors).length > 0) {
      setErrors(
        validate(
          {
            ...password,
            [e.target.name]: e.target.value,
            [e.target.name]: e.target.value,
          },
          "register"
        )
      )
    }
  }

  // it detects the changes from the input and on key press Enter, sends the info to multiSearch()
  useEffect(() => {
    const listener = (event) => {
      if (
        event.code === "Enter" ||
        event.code === "NumpadEnter" ||
        event.keyCode === 13
      ) {
        toggle()
      }
    }
    document.addEventListener("keydown", listener)
    return () => {
      document.removeEventListener("keydown", listener)
    }
    // eslint-disable-next-line
  }, [password])

  // Validate that no one can get inside the app without login or registering
  useEffect(() => {
    if (!props.user?._id) {
      history.push("/")
    }
    // eslint-disable-next-line
  }, [])

  // FUNCTIONS
  const toggle = async () => {
    const errs = validate(password, "register")
    setErrors(errs)

    if (Object.keys(errs).length > 0) return

    const body = {
      oldPassword: password.oldPassword,
      newPassword: password.password,
    }

    try {
      const result = await axios.put(
        port + USER + "/change_password/" + props.user._id,
        body,
        auth
      )
      if (result) {
        props.dispatch({ type: UPDATE, payload: result.data })
        setTimeout(() => {
          setActive(true)
        }, 500)
        setTimeout(() => {
          setActive(false)
        }, 2500)
      } else {
        setMessage("Incorrect Password")
      }
    } catch (error) {
      setMessage("Incorrect Password")
    }
  }

  return (
    <div className="changePasswordComponent">
      <div className="changePasswordContainer">
        {active && (
          <div className="check">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
        )}
        <h2>Change Password</h2>
        <div className="inputPassword">
          <InputForm
            type="password"
            name="oldPassword"
            length="16"
            onChange={handleChange}
            title="Introduce your password"
            error={message}
          />
        </div>
        <div className="inputPassword">
          <InputForm
            type="password"
            name="password"
            length="16"
            onChange={handleChange}
            title="Introduce your new password"
            error={errors.password?.help}
          />
        </div>
        <div className="inputPassword">
          <InputForm
            type="password"
            name="repeatPassword"
            length="16"
            onChange={handleChange}
            title="Repeat your new password"
            error={errors.repeatPassword?.help}
          />
        </div>
        <div className="buttonPassword">
          <Button onClick={() => toggle()}>
            <p>Change Password</p>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token,
  }
}

export default connect(mapStateToProps)(ChangePassword)
