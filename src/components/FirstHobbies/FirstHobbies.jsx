import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { hobby, port } from '../../tools/apiPaths'

const FirstHobbies = () => {

    const [hobbies, setHobbies] = useState([])
    console.log(hobbies)

    const getHobbies = async () => {
        let result = await axios.get(port+hobby)
        setHobbies(result.data)
    }


    useEffect(()=> {
        getHobbies()
    },[])


    return (
        <div className="firstHobbiesComponent">
            <div className="hobbiesTitle">
                <h2>SELECT YOUR HOBBIES</h2>
            </div>
            <div className="hobbiesContainer">
                <div className="hobbyGrid">
                    {
                        hobbies.map(hobby => {
                            return(
                                <div className="hobby" key={hobby._id}>
                                    <p>{hobby.hobby_name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FirstHobbies
