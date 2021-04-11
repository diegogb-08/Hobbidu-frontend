import { LOGIN, LOGOUT, UPDATE, SETACTIVE } from '../types/userType';

const initialState = {
    user: {},
    token: '',
    active: false

};

const userReducer = (state = initialState, action) => {

    switch(action.type){
        case LOGIN :
            return {
                ...state,
                user : action.payload.user,
                token : action.payload.token,
                
            }

        case SETACTIVE : 
            return {
                ...state,
                active : true
            }

        case LOGOUT :
            return initialState

        case UPDATE :
            return {
                ...state,
                user : action.payload

            }
        default :
            return state
    }
};

export default userReducer;