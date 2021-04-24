import { ADDEVENT, REMOVEEVENT, CLEANEVENT } from '../types/eventType';

const initialState = {
    event: {},
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDEVENT:
            return {
                allEvents: action.payload,
            };

        case REMOVEEVENT:
            const numIndex = parseInt(action.payload)
            return {
                allEvents: [
                    ...state.allEvents.slice(0, numIndex),
                    ...state.allEvents.slice(numIndex + 1)
                ]
            }

        case CLEANEVENT:
            return initialState 

        default:
            return state
    }
}

export default eventReducer;