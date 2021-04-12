import React, { useState } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader'


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
        <div>
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
                    className="inputText"
                    {...getInputProps({
                        placeholder: "Enter Address...",
                    })}
                    />
                    <div>
                    {loading && <div>Loading ...</div>}
                    {suggestions.map((suggestion) => {
                        console.log(suggestions)
                        const style = suggestion.active
                        ? { backgroundColor: "#f05356", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
    
                        return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                            {suggestion.description}
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
