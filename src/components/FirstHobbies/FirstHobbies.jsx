import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { USER, hobby, PORT } from '../../helper/apiPaths'
import InputForm from '../InputForm/InputForm'
import { connect } from 'react-redux'
import Button from '../Button/Button'
import { SETACTIVE, UPDATE } from '../../redux/types/userType'
import { useHistory } from 'react-router'
import { ADD } from '../../redux/types/hobbyType'

const FirstHobbies = (props) => {
  const history = useHistory()

  // AUTHORIZATION
  const token = props.token
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // HOOKS

  const [hobbies, setHobbies] = useState([])
  const [isSelected, setIsSelected] = useState([])
  const [newHobby, setNewHobby] = useState('')
  const [message, setMessage] = useState('')

  const getHobbies = async () => {
    const result = await axios.get(PORT + hobby)
    setHobbies(result.data)
    props.dispatch({ type: ADD, payload: result.data })
  }

  // Handlers

  const handleState = (e) => {
    setNewHobby(e.target.value)
  }

  const addNewHobby = async () => {
    const body = {
      hobby_name: newHobby,
      user_id: props.user._id,
    }

    if (isSelected.length < 3) {
      const result = await axios.post(PORT + hobby, body)

      if (result.data)
        // hacer validacion
        setIsSelected([...isSelected, result.data])
    } else {
      setMessage('Max 3 hobbies reached')
    }
  }

  useEffect(() => {
    getHobbies()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getProps()
    // eslint-disable-next-line
  }, [])

  // it detects the changes from the input and on key press Enter, sends the info to multiSearch()
  useEffect(() => {
    const listener = (event) => {
      if (
        event.code === 'Enter' ||
        event.code === 'NumpadEnter' ||
        event.keyCode === 13
      ) {
        addNewHobby()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
    // eslint-disable-next-line
  }, [newHobby])

  // FUNCTIONS

  const getProps = () => {
    if (props.user?.hobbies) {
      setIsSelected(props.user?.hobbies)
    }
  }

  const selectTag = (hobby) => {
    if (isSelected[0]) {
      const itemId = isSelected?.map((item) => item?._id)
      if (itemId.find((element) => element === hobby._id) === undefined) {
        if (isSelected.length < 3) {
          setIsSelected([...isSelected, hobby])
          setMessage('')
        }
      } else {
        setIsSelected(isSelected.filter((element) => element._id !== hobby._id))
        setMessage('')
      }
    } else {
      setIsSelected([...isSelected, hobby])
      setMessage('')
    }
  }

  const toggle = async () => {
    const body = {
      hobbies: isSelected,
    }
    if (isSelected[0]) {
      const result = await axios.put(
        PORT + USER + '/' + props.user._id,
        body,
        auth
      )
      props.dispatch({ type: UPDATE, payload: result.data })
      if (props.user?.hobbies && props.active) {
        return setMessage('Hobbies succesfully updated!')
      } else {
        setTimeout(() => {
          props.dispatch({ type: SETACTIVE })
          history.push('/home')
        }, 500)
      }
    }
  }

  return (
    <div className="firstHobbiesComponent">
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="hobbiesTitle">
        <h2>SELECT UP TO 3 HOBBIES</h2>
      </div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="selectedHobbies">
        {isSelected?.map((hobby) => {
          return (
            <div
              className="selected"
              key={hobby?._id}
              onClick={() => selectTag(hobby)}
            >
              <p>{hobby?.hobby_name}</p>
            </div>
          )
        })}
      </div>
      <div className="hobbiesContainer">
        <div className="hobbyGrid">
          {hobbies.map((hobby) => {
            return (
              <div
                className="hobby"
                key={hobby._id}
                onClick={() => selectTag(hobby)}
              >
                <p>{hobby.hobby_name}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="searchNewHobby">
        <p>You can&apos;t find your Hobby?</p>
        <InputForm
          type="text"
          name="newHobby"
          onChange={handleState}
          title="Add hobby & PRESS ENTER"
        />
      </div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="hobbyButton">
        <Button onClick={() => toggle()}>
          <p>Enjoy!</p>
        </Button>
      </div>
      <div className="message">
        <p>{message}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token,
    active: state.userReducer.active,
    allHobbies: state.hobbyReducer.allHobbies,
  }
}

export default connect(mapStateToProps)(FirstHobbies)
