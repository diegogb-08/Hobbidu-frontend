import axios from "axios"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { EVENT, port } from "../../helper/apiPaths"
import ControlPanel from "../../components/ControlPanel/ControlPanel"
import moment from "moment"
import Footer from "../../components/Footer/Footer"
import GeoLocation from "../../components/GeoLocation/GeoLocation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus, faCheck } from "@fortawesome/free-solid-svg-icons"
import { ADDEVENT } from "../../redux/types/eventType"
import { useHistory } from "react-router"

const EventView = (props) => {
  const history = useHistory()

  // Hooks

  const [distance, setDistance] = useState(25000)
  const [myEvents, setMyEvents] = useState([])
  const [mySuggestions, setMySuggestions] = useState([])

  // Handlers

  const handleChange = (e) => {
    setDistance(parseInt(e.target.value))
  }

  useEffect(() => {
    filterEventsCall()
    // eslint-disable-next-line
  }, [distance, props.location])

  // Validate that no one can get inside the app without login or registering
  useEffect(() => {
    if (!props.user?._id) history.push("/")
    // eslint-disable-next-line
  }, [])

  const filterEventsCall = async () => {
    if (props?.location?.coordinates || props.user?.location?.coordinates) {
      const body = {
        distance: distance,
        coords: props.location?.coordinates
          ? props.location?.coordinates
          : props.user.location?.coordinates,
      }

      try {
        const result = await axios.post(port + EVENT + "/distance", body)

        if (result) {
          // here we are filtering the events by our hobbies
          const events = filter(result.data)
          setMyEvents(events.filter)
          setMySuggestions(events.filterSuggestion)
        }
      } catch (err) {}
    }
  }

  // here we are filtering the events by our hobbies
  const filter = (data) => {
    // Filtering own hobbies
    const filter = data.filter(
      (element) =>
        element.hobby_id._id === props.user.hobbies[0]._id ||
        element.hobby_id._id === props.user.hobbies[1]._id ||
        element.hobby_id._id === props.user.hobbies[2]._id
    )

    // Filtering NO own hobbies
    const filterSuggestion = data.filter(
      (element) =>
        element.hobby_id._id !== props.user.hobbies[0]._id &&
        element.hobby_id._id !== props.user.hobbies[1]._id &&
        element.hobby_id._id !== props.user.hobbies[2]._id
    )

    return { filter, filterSuggestion }
  }

  // This function set up the FontAwesome icon for each event taking into consideration if the user is a joiner or not
  const getJoiners = (joiners) => {
    if (joiners.find((element) => element._id === props.user._id) !== undefined)
      return faCheck
    else return faUserPlus
  }

  const setJoinGoin = (joiners) => {
    if (joiners.find((element) => element._id === props.user._id) !== undefined)
      return "Going"
    else return "Join"
  }

  const joinUser = async (event) => {
    const body = {
      user_id: props.user._id,
    }

    try {
      const result = await axios.put(port + EVENT + "/join/" + event._id, body)
      if (result) return filterEventsCall()
    } catch (err) {}
  }

  const openEvent = (event) => {
    props.dispatch({ type: ADDEVENT, payload: event })
    setTimeout(() => {
      history.push(`/event/${event._id}`)
    })
  }

  return (
    <div className="eventViewComponent">
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <ControlPanel />
      <div className="eventViewContainer">
        <div className="filterEvents">
          <div className="filterDistance">
            <p>Within</p>
            <select
              className="selector"
              name="distance"
              onChange={handleChange}
              defaultValue={25000}
            >
              <option value={5000}> 5 km </option>
              <option value={10000}> 10 km </option>
              <option value={25000}> 25 km </option>
              <option value={50000}> 50 km </option>
              <option value={100000}> 100 km </option>
              <option value={1000000}> any dinstance </option>
            </select>
            <p>of</p>
            <div className="geolocationEventContainer">
              <GeoLocation />
            </div>
          </div>
        </div>
        <div className="renderEventsContainer">
          <div className="spacer"></div>
          <h2 className="title">Events related to your hobbies</h2>
          {myEvents.length > 0 ? (
            <>
              <div>
                {myEvents.map((event) => {
                  const leftSpots = event.maxJoiners - event.joiners?.length

                  if (new Date(event.event_date) >= new Date())
                    return (
                      <div className="event" key={event._id}>
                        <div className="date">
                          <p>
                            {moment(event.event_date).format(
                              "ddd, Do MMM YYYY"
                            )}
                          </p>
                        </div>
                        <div className="eventContent">
                          <div className="eventContentLeft">
                            <h2 onClick={() => openEvent(event)}>
                              {event.title}
                            </h2>
                            <p>{event.location.name}</p>
                            <div className="joinersSpotsLeft">
                              <p>{event.joiners?.length} joiner/s</p>
                              <p className="spotsLeft">
                                {" "}
                                {leftSpots} spots left!
                              </p>
                            </div>
                          </div>
                          <div className="eventContentCenter">
                            <p>
                              <b>Own vehicle:</b> {event.vehicle ? "Yes" : "No"}
                            </p>
                            {event.vehicle ? (
                              <>
                                <p>{event.seats} seats left</p>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="eventContentRight">
                            <div className="hobbyTag">
                              <p>{event.hobby_id.hobby_name}</p>
                            </div>
                            <div
                              className="signUp"
                              onClick={() => joinUser(event)}
                            >
                              <FontAwesomeIcon
                                icon={getJoiners(event?.joiners)}
                                className="joinUserIcon"
                              />
                              <p>{setJoinGoin(event?.joiners)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  // eslint-disable-next-line
                  return
                })}
              </div>
            </>
          ) : (
            <>
              <div className="event">
                <div className="notEvents">
                  <h2>
                    Not events found related to your hobbies. Try changing the
                    location and the distance or start posting your events
                  </h2>
                </div>
              </div>
            </>
          )}
          <div className="spacer"></div>
          <h2 className="title">Other events you might find interesting!</h2>
          {mySuggestions.length > 0 ? (
            <>
              <div>
                {mySuggestions.map((event) => {
                  const leftSpots = event.maxJoiners - event.joiners?.length
                  if (new Date(event.event_date) >= new Date())
                    return (
                      <div className="event" key={event._id}>
                        <div className="date">
                          <p>
                            {moment(event.event_date).format(
                              "ddd, Do MMM YYYY"
                            )}
                          </p>
                        </div>
                        <div className="eventContent">
                          <div className="eventContentLeft">
                            <h2 onClick={() => openEvent(event)}>
                              {event.title}
                            </h2>
                            <p>{event.location.name}</p>
                            <div className="joinersSpotsLeft">
                              <p>{event.joiners?.length} joiner</p>
                              <p className="spotsLeft">
                                {" "}
                                {leftSpots} spots left!
                              </p>
                            </div>
                          </div>
                          <div className="eventContentCenter">
                            <p>
                              <b>Own vehicle:</b> {event.vehicle ? "Yes" : "No"}
                            </p>
                            {event.vehicle ? (
                              <>
                                <p>{event.seats} seats left</p>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="eventContentRight">
                            <div className="hobbyTag">
                              <p>{event.hobby_id.hobby_name}</p>
                              {/* <FilterHobbyTag hobby_id={event.hobby_id}/> */}
                            </div>
                            <div
                              className="signUp"
                              onClick={() => joinUser(event)}
                            >
                              <FontAwesomeIcon
                                icon={getJoiners(event?.joiners)}
                                className="joinUserIcon"
                              />
                              <p>Join</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  // eslint-disable-next-line
                  return
                })}
              </div>
            </>
          ) : (
            <>
              <div className="event">
                <div className="notEvents">
                  <h2>
                    Not events found. Try changing the location and the distance
                    or start posting your events
                  </h2>
                </div>
              </div>
            </>
          )}
          <div className="spacer"></div>
          <div className="spacer"></div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    location: state.userReducer.location,
    event: state.eventReducer,
  }
}

export default connect(mapStateToProps)(EventView)
