import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ADD } from '../../redux/types/hobbyType'
import { hobby, port } from '../../tools/apiPaths'

const FilterHobbyTag = (props) => {


    const [hobbies, setHobbies] = useState([])

    useEffect(()=> {
        getHobbies()
        // eslint-disable-next-line
    },[])

    // Functions

    const getHobbies = async () => {
        let result = await axios.get(port+hobby+'/all')
        setHobbies(result.data)
        props.dispatch({type: ADD, payload: result.data})
    }


     // This function add the hobby name in each event as a tag

     const filterHobbyTag = (data) => {
        let filter = hobbies.filter(element => element._id === data)
        return filter[0]?.hobby_name;
    }



    return (
        <div className="filterHobbyTagComponent">
            <p>{filterHobbyTag(props.hobby_id)}</p>
        </div>
    )
}

export default connect()(FilterHobbyTag); 
