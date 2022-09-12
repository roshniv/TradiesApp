import * as types from "./actionTypes";
import * as projectApi from "../../api/projectApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadProjectSuccess(projects) {
  return { type: types.LOAD_PROJECTS_SUCCESS, projects };
}

export function createProjectSuccess(project) {
  return { type: types.CREATE_PROJECT_SUCCESS, project };
}

export function updateProjectSuccess(project) {
  return { type: types.UPDATE_PROJECT_SUCCESS, project };
}

export function deleteProjectOptimistic(project) {
  return { type: types.DELETE_PROJECT_OPTIMISTIC, project };
}

export function loadProjects() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return projectApi
      .getProjects()
      .then(projects => {
        dispatch(loadProjectSuccess(projects));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveProject(project) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return projectApi
      .saveProject(project)
      .then(savedProject => {
        project.id
          ? dispatch(updateProjectSuccess(savedProject))
          : dispatch(createProjectSuccess(savedProject));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteProject(project) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteProjectOptimistic(project));
    return projectApi.deleteProject(project.id);
  };
}
