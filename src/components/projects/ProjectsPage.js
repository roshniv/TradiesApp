import React from "react";
import { connect } from "react-redux";
import * as projectActions from "../../redux/actions/projectActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ProjectList from "./ProjectList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class ProjectPage extends React.Component {
  state = {
    redirectToAddProjectPage: false,
    redirectToAddABidPage: false
  };

  componentDidMount() {
    const { projects, actions } = this.props;

    if (projects.length === 0) {
      actions.loadProjects().catch(error => {
        alert("Loading projects failed" + error);
      });
    }
  }

  handleDeleteProject = async project => {
    toast.success("Project deleted");
    try {
      await this.props.actions.deleteProject(project);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddProjectPage && <Redirect to="/project" />}
        {this.state.redirectToAddABidPage && <Redirect to="/bid-to-project" />}
        <h2>Projects</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-project"
              onClick={() => this.setState({ redirectToAddProjectPage: true })}
            >
              Add New Project
            </button>

            <ProjectList
              onDeleteClick={this.handleDeleteProject}
              onAddingBidClick={this.handleAddingNewBid}
              projects={this.props.projects}
            />
          </>
        )}
      </>
    );
  }
}

ProjectPage.propTypes = {
  projects: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    // projects: state.projects,
    projects: state.projects.map(project => {
            return {
              ...project,
              status: project.lastDay && (new Date().toISOString().slice(0, 10) >= project.lastDay) ? 'Expired' : 'Active'
            };
          }),
    
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProjects: bindActionCreators(projectActions.loadProjects, dispatch),
      deleteProject: bindActionCreators(projectActions.deleteProject, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPage);
