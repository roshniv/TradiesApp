import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function projectReducer(state = initialState.projects, action) {
  switch (action.type) {
    case types.CREATE_PROJECT_SUCCESS:
      return [...state, { ...action.project }];
    case types.UPDATE_PROJECT_SUCCESS:
      return state.map(project =>
        project.id === action.project.id ? action.project : project
      );
    case types.LOAD_PROJECTS_SUCCESS:
      return action.projects;
    case types.DELETE_PROJECT_OPTIMISTIC:
      return state.filter(project => project.id !== action.project.id);
    default:
      return state;
  }
}
