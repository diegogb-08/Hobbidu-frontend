import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { ADDLOCATION } from '../../redux/types/userType';

const GeoLocation = ({ isScriptLoaded, isScriptLoadSucceed, dispatch}) => {

    const [address, setAddress] = useState("");

    const handleChange = async (value) => {
        setAddress(value)
        dispatchGeoLocation(value)
    }
  
    const handleSelect = (value) => {
        setAddress(value)
        dispatchGeoLocation(value)
    }

    const dispatchGeoLocation = async (value) => {
      let result = await geocodeByAddress(value)
      let coords = await getLatLng(result[0])
      let location = {
        name: value,
        coordinates: [coords.lng, coords.lat]
      }
      return await dispatch({type: ADDLOCATION, payload: location})
    }

    if (isScriptLoaded && isScriptLoadSucceed) {

      return (
        <div className="canvas">
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
                className="placesAutocomplete"
            >
            {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,

            }) => (
                <div className="inputDiv">
                    <input
                    {...getInputProps({
                        placeholder: "Enter Address...",
                        className: "inputText"
                    })}
                    />
                    <div className="autocompleteDropdownContainer">
                    {loading && <div>Loading ...</div>}
                    {suggestions.map((suggestion) => {
                        const style = suggestion.active
                        ? { backgroundColor: "#f05356", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };

                        return (
                        <div className="suggestion" {...getSuggestionItemProps(suggestion, { 
                          style 
                        })} 
                          key={suggestion.description}
                          >
                           <FontAwesomeIcon icon={faMapMarkerAlt} className="iconSuggestion"/> {suggestion.description}
                        </div>
                        );
                    })}
                    </div>
                </div>
            )}
            </PlacesAutocomplete>
        </div>
      );
    } else {
      return <div></div>;
    }
    
}
export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`,])(connect()(GeoLocation));
