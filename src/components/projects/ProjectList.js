import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProjectList.css";

const ProjectList = ({ projects, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>No. of Bids</th>
        <th>Status</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {projects.map(project => {
        return (
          <tr key={project.id}>
            <td>
              <Link to={"/project/" + project.slug}>{project.title}</Link>
            </td>
            <td>{project.id && project.bids ? project.bids.length : 0}</td>
            <td>{project.status}</td>
            <td>
              <Link to={"/bid-to-project/" + project.slug } className={project.status === 'Expired' ? 'disabled-link' : ''}>Add a bid</Link>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(project)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default ProjectList;
