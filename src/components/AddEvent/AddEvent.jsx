import React, { useState } from 'react'
import Modal from '../Modal/Modal';
import GeoLocation from '../GeoLocation/GeoLocation';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import axios from 'axios';
import {port,customer, search, query, meeting} from '../../tools/apiPaths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserTimes } from '@fortawesome/free-solid-svg-icons';
// import Avatar from '../Avatar/Avatar';

const AddEvent = (props) => {
    // Modal Hook
    const [active, setActive] = useState(false);
    const toggle = () => {
        setActive(!active)
    } 

    const [selected, setSelected] = useState({});

    const [event, setEvent] = useState({
        title: '',
        hobby_id: '',
        event_date: '',
        maxJoiners: 0,
        vehicle: false,
        seats: '',
        joiners: [],
        description: '',
    })

    const [suggestion, setSuggestion] = useState([])

    const [friends, setFriends] = useState([])

    const [disabled, setDisabled] = useState('disabled')

    const [message, setMessage] = useState('')

    //Handlers

    const handleChange = (e) => {
        setEvent({...event, [e.target.name]: e.target.type === "number" ? + e.target.value : e.target.value});
    }

    const handleJoiners = async (e) => {

        try{

            let result = await axios.get(port+customer+search+query+e.target.value)
            setSuggestion(result.data)

        }catch(err){

            throw new Error(404)

        }
    }

    const handleSelected = async (user) => {
        let maxJoiners = parseInt(event.maxJoiners)
        let joinerIdFound = event.joiners.find(id => id === user._id )
        if (maxJoiners !== event.joiners.length && joinerIdFound === undefined){
            setEvent({...event, joiners: [...event.joiners, user._id]});
            setFriends([...friends, user])
            let result = await axios.get(port+customer+search+query)
            setSuggestion(result.data)
        }
    }

    const handleCheckBox = (e) => {

        if(e.target.checked === true){
            setDisabled('')
            setEvent({...event, vehicle: e.target.checked})
        }else{
            setDisabled('disabled')
            setEvent({...event, vehicle: e.target.checked, seats: ''})
        }
        
    }

    // Functions

    const toggleEvent = async () => {

        let body = {
            title: event.title,
            user_id : props.user._id,
            hobby_id : event.hobby_id,
            joiners : event.joiners,
            maxJoiners: event.maxJoiners,
            vehicle: event.vehicle,
            seats: event.seats,
            description: event.description,
            location: props.location,
            event_date: event.event_date,
        }

        // Calling the api to create the Event
        if(event.hobby_id !== ''){
            try{
                let result = axios.post(port+meeting, body)
                if(result.data){
                    setTimeout(()=>{toggle()},500)
                    setDisabled('disabled')
                }
            }catch (err){
                throw new Error(404);
            }
        }else{
            setMessage('Please, select your hobby!')
        }
    }


    const selectHobby = (hobby_id) => {
        setSelected({[hobby_id]:{backgroundColor: '#f05356', color: 'white'}})
        setEvent({...event, hobby_id : hobby_id})
        setMessage('')
    }

    const deleteJoiner = (user) => {
        setEvent({...event, joiners: event.joiners.filter(element => element !== user._id)});
        setFriends(friends.filter(element => element._id !== user._id))
    }

    return (
        <div>
            <div className="configComponent" onClick={()=>toggle()}>{props.children}</div>
            <Modal active={active} toggle={()=>toggle()}>
                <div className="AddEventContainer">
                    <h1>Create an Event</h1>
                    <div className="addEventInfo">
                        <div className="addEventSections">
                            <div className="inputEvent">
                                <p className="titles" >Title</p>
                                <input type="text" name="title" maxLength="50" onChange={handleChange} required/>
                            </div>
                            <div className="inputEvent inputHobbies">
                                <p className="titles">Select 1 of your hobbies</p>
                                <div className="hobbies">
                                    {
                                        props.user.hobbies.map(hobby => {
                                            return(
                                                <div className="hobby" style={selected[hobby._id]} key={hobby._id} onClick={()=>selectHobby(hobby._id)}>
                                                    <p>{hobby.hobby_name}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <p className="message">{message}</p>
                            </div>
                            <div className="inputEvent">
                                <p className="titles">Date and time</p>
                                <input type="datetime-local" name="event_date" maxLength="20" onChange={handleChange} required/>
                            </div>
                            <div className="inputEvent">
                                <p className="titles">Location</p>
                                <GeoLocation />
                            </div>
                        </div>
                        <div className="addEventSections">
                            <div className="inputEvent smallInputs">
                                <div>
                                    <p className="titles">Max. joiners</p>
                                    <select className="selector" name="maxJoiners" onChange={handleChange} >
                                        <option value={0} defaultValue>0</option>
                                        <option value={1}  >1</option>
                                        <option value={2}  >2</option>
                                        <option value={3}  >3</option>
                                        <option value={4}  >4</option>
                                        <option value={5}  >5</option>
                                        <option value={6}  >6</option>
                                        <option value={7}  >7</option>
                                        <option value={8}  >8</option>
                                        <option value={9}  >9</option>
                                        <option value={10} >10</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="titles">Own vehicle</p>
                                    <label className="switch">
                                        <input type="checkbox" name="vehicle" onChange={handleCheckBox}/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <div>
                                    <p className="titles">Seats</p>
                                    <select className="selector" name="seats" onChange={handleChange} disabled={disabled}>
                                        <option value={0} defaultValue>0</option>
                                        <option value={1}  >1</option>
                                        <option value={2}  >2</option>
                                        <option value={3}  >3</option>
                                        <option value={4}  >4</option>
                                        <option value={5}  >5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="inputEvent">
                                <div className="grid">
                                    {
                                        friends?.map(friend => {
                                            return (
                                                <div className="friend" key={friend._id}>
                                                    <FontAwesomeIcon icon={faUserTimes} className="iconFriend" onClick={()=>deleteJoiner(friend)} />
                                                    <p>{friend.name}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <p className="titles">Joiners</p>
                                <input type="text" name="joiners" maxLength="20" onChange={handleJoiners} placeholder="Add yourself and your friends"/>
                                <div className="autocompleteDropdownContainer">
                                    {
                                        suggestion?.map(user => {
                                            return (
                                                <div className="suggestion" key={user._id} onClick={()=>handleSelected(user)}>
                                                    <FontAwesomeIcon icon={faUserPlus} className="iconSuggestion" />
                                                    {/* <Avatar /> */}
                                                    <p>{user.name}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                
                            </div>
                            <div className="inputEvent">
                                <p className="titles">Description</p>
                                <p>Try to give as much information as you can so the joiners can get full info!</p>
                                <textarea className="text"  cols="30" rows="8" name="description" maxLength="3000" onChange={handleChange}/>
                            </div>
                            <div className="inputButton">
                                <div className="eventButton">
                                    <Button onClick={()=>toggleEvent()}>
                                        <p>Create Event</p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
        location: state.userReducer.location
    }
}

export default connect(mapStateToProps)(AddEvent);
