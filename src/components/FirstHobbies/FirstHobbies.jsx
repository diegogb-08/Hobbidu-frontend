import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { hobby, port } from '../../tools/apiPaths'

const FirstHobbies = () => {

    const [hobbies, setHobbies] = useState([])

    const [isSelected, setIsSelected] = useState([])
    console.log(isSelected)

    const getHobbies = async () => {
        let result = await axios.get(port+hobby)
        setHobbies(result.data)
    }


    useEffect(()=> {
        getHobbies()
    },[])

    useEffect(()=> {
      
    })

    // FUNCTIONS

    const selectTag = (hobby) => {
        if(isSelected[0]){
            let itemId = isSelected.map(item => item._id)
            if(itemId.find(element => element === hobby._id) === undefined){
                setIsSelected([...isSelected, hobby])
            }else{
                // setIsSelected(isSelected.filter(({id})=> id !== itemId))

            //     let index = isSelected.indexOf(id)
            //     if (index === -1){
            //         console.log('estoy dentro')
            //         setIsSelected([...isSelected.splice(index)])
                    
            //     }
            //     console.log(index)
            }
        }else{
            setIsSelected([...isSelected, hobby])
        }
    }


    return (
        <div className="firstHobbiesComponent">
            <div className="hobbiesTitle">
                <h2>SELECT YOUR HOBBIES</h2>
            </div>
            <div className="selectedHobbies">
                {
                    isSelected?.map(hobby => {
                        console.log(hobby)
                        return(
                            <div className="selected" key={hobby._id} onClick={()=>selectTag(hobby)}>
                                <p>{hobby.hobby_name}</p>
                            </div>
                        )
                    })
                    
                }
            </div>
            <div className="hobbiesContainer">
                <div className="hobbyGrid">
                    {
                        hobbies.map(hobby => {
                            return(
                                <div className="hobby" key={hobby._id} onClick={()=>selectTag(hobby)}>
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
