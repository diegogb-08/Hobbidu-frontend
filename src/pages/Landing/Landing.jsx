import React, { useState } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router"
import FirstHobbies from "../../components/FirstHobbies/FirstHobbies"
import Login from "../../components/Login/Login"
import Register from "../../components/Register/Register"

const Landing = (props) => {
  const history = useHistory()

  const [active, setActive] = useState(true)

  const register = () => {
    setTimeout(() => {
      setActive(!active)
    }, 500)
  }

  if (props.user?.hobbies?.length > 0) {
    history.push("/home")
  }

  return (
    <div className="landingsComponent">
      <div className="landingContainers landingLeft">
        <div className="slogan top">
          <p>FIND YOUR HOBBY</p>
        </div>
        <div className="slogan bottom">
          <p>CONNECT WITH PEOPLE</p>
        </div>
      </div>
      <div className="landingContainers landingRight">
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        {active ? (
          <>
            {props.showHobbies ? (
              <>
                <FirstHobbies />
              </>
            ) : (
              <>
                <Login />
                <div className="registerLanding">
                  <p>Don&apos;t have an account?</p>
                  <p className="register" onClick={() => register()}>
                    Register
                  </p>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {props.showHobbies ? (
              <>
                <FirstHobbies />
              </>
            ) : (
              <>
                <Register />
                <div className="registerLanding">
                  <p>Do you have an account?</p>
                  <p className="register" onClick={() => register()}>
                    Sign In
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    showHobbies: state.hobbyReducer.showHobbies,
  }
}

export default connect(mapStateToProps)(Landing)
