import {combineReducers} from 'redux';
import userReducer from './userReducer';
import hobbyReducer from './hobbyReducer';

const rootReducer = combineReducers({
    userReducer,
    hobbyReducer
});

export default rootReducer;
