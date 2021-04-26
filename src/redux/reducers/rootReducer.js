import {combineReducers} from 'redux';
import userReducer from './userReducer';
import hobbyReducer from './hobbyReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
    userReducer,
    hobbyReducer,
    eventReducer
});

export default rootReducer;
