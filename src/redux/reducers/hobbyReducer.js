import { ADD, REMOVE, CLEAN, SHOWHOBBIES } from '../types/hobbyType';

const initialState = {
    hobby: [],
    showHobbies: false
};

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                hobby: [...state.hobby, action.payload],
            };

        case REMOVE:
            const numIndex = parseInt(action.payload)
            return {
                hobby: [
                    ...state.hobby.slice(0, numIndex),
                    ...state.hobby.slice(numIndex + 1)
                ]
            }

        case SHOWHOBBIES:
            return {
                ...state,
                showHobbies : true
            }

        case CLEAN:
            return {
                ...state,
                hobby: action.payload
            };
        default:
            return state
    }
}

export default hobbyReducer;