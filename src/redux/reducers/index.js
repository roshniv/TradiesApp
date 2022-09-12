import { combineReducers } from "redux";
import projects from "./projectReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  projects,
  apiCallsInProgress
});

export default rootReducer;
