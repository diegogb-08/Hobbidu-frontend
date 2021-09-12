import { ADD, REMOVE, CLEAN, SHOWHOBBIES } from "../types/hobbyType";

const initialState = {
  allHobbies: [],
  showHobbies: false,
};

const allHobbiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        allHobbies: action.payload,
        showHobbies: true,
      };

    case REMOVE:
      // eslint-disable-next-line no-case-declarations
      const numIndex = parseInt(action.payload);
      return {
        allHobbies: [
          ...state.allHobbies.slice(0, numIndex),
          ...state.allHobbies.slice(numIndex + 1),
        ],
      };

    case SHOWHOBBIES:
      return {
        ...state,
        showHobbies: true,
      };

    case CLEAN:
      return initialState;

    default:
      return state;
  }
};

export default allHobbiesReducer;
