import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadProjects, saveProject } from "../../redux/actions/projectActions";
import PropTypes from "prop-types";
import AddNewProjectForm from "./AddNewProjectForm";
import { newProject } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageProjectPage({
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
    const { title, details, hours, lastDay, lastTime } = project;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!details) errors.details = "Details is required";
    if (!hours) errors.hours = "Number of Hours is required";
    if (!lastDay) errors.lastDay = "Last Day is required";
    if (!lastTime) errors.lastTime = "Last Time is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveProject(project)
      .then(() => {
        toast.success("Project saved.");
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
    <AddNewProjectForm
      project={project}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageProjectPage.propTypes = {
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
)(ManageProjectPage);
