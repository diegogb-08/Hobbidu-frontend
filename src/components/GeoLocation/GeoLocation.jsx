import React, { useState } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const GeoLocation = ({ isScriptLoaded, isScriptLoadSucceed},props) => {

    const [address, setAddress] = useState("");

    const handleChange = (value) => {
      setAddress(value)
    }
  
    const handleSelect = (value) => {
      setAddress(value)
    }

    if (isScriptLoaded && isScriptLoadSucceed) {

      return (
        <div className="canvas">
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
            {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
            }) => (
                <div>
                    <input
                    {...getInputProps({
                        placeholder: "Enter Address...",
                        className: "inputText",
                        name: props.name
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
export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`,])(GeoLocation);
