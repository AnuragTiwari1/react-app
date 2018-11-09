import {combineReducers} from "redux";
import data from './data'
import user from './user'
const config = combineReducers({
  DATA:data,
  USER:user,
});

export default config;
