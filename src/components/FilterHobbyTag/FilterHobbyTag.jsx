import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ADD } from '../../redux/types/hobbyType'
import { hobby, port } from '../../tools/apiPaths'

const FilterHobbyTag = (props) => {


    const [hobbies, setHobbies] = useState([]);

    useEffect(()=> {

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const getHobbies = async () => {
    
            try{
    
                let result = await axios.get(port+hobby+'/all', { cancelToken: source.token });
                setHobbies(result.data);
                props.dispatch({type: ADD, payload: result.data});
            }catch(error){
                if (axios.isCancel(error)) {
                    console.log("cancelled");
                  } else {
                    throw error;
                  }
            }
        };

        getHobbies();
        return () => {
            source.cancel();
        };
    },[props])

    // Functions



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
