import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadProjects, saveProject } from "../../redux/actions/projectActions";
import PropTypes from "prop-types";
import AddBidToProject from "./AddBidToProject";
import { newProject } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageBidPage({
  projects,
  loadProjects,
  saveProject,
  history,
  ...props
}) {
  const [project, setProject] = useState({ ...props.project });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (projects.length === 0) {
      loadProjects().catch(error => {
        alert("Loading projects failed" + error);
      });
    } else {
      setProject({ ...props.project });
    }
  }, [props.project]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProject(prevProject => ({
      ...prevProject,
      [name]: value
    }));
  }

  function formIsValid() {
    const { bidder, hrate } = project;
    const errors = {};

    if (!bidder) errors.bidder = "Name is required.";
    if (!hrate) errors.hrate = "Hourly rates are required";
    
    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) 
      return;
    setSaving(true);

    var newProject = project;
    if(!newProject.bids || newProject.bids.length === 0) {
      newProject.bids = [];
    }
    let newBid = {
        bidder: event.target.bidder.value,
        hrate: event.target.hrate.value
    };
    const val =  {bids: [...newProject.bids, newBid]};
    
    saveProject({ ...newProject, ...val })
      .then(() => {
        toast.success("Project updated.");
        history.push("/projects");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return projects.length === 0 ? (
    <Spinner />
  ) : (
    <AddBidToProject
      project={project}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageBidPage.propTypes = {
  project: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  loadProjects: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getProjectBySlug(projects, slug) {
  return projects.find(project => project.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const project =
    slug && state.projects.length > 0
      ? getProjectBySlug(state.projects, slug)
      : newProject;
  return {
    project,
    projects: state.projects
  };
}

const mapDispatchToProps = {
  loadProjects,
  saveProject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBidPage);
