// #region Global Imports
import { combineReducers } from "redux";
// #end region Global Imports

// #region Local Imports
import HomeReducer from "./home";
import ProfileReducer from "./profile";
// #end region Local Imports

export default combineReducers({
    home: HomeReducer,
    profile: ProfileReducer,
});
