/** @format */

import { combineReducers } from "redux";
import users from "./reducers/users-reducer";
import job from "./reducers/job-reducer" 

export const rootReducer = combineReducers({
  // companiesAndPerson: companiesAndPerson,
  users: users,
  jobs : job
});

export default rootReducer;
