import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AddNewProjectForm = ({
  project,
  onSave,
  onChange,
  saving = false,
  errors = {},
  date1 = new Date() 
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{project.id ? "Edit" : "Add New"}  Project</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}   

      <div style= {{ marginTop: 20 }}>
        <TextInput
          name="title"
          label="Title"
          value={project.title}
          onChange={onChange}
          error={errors.title}
        />

        <TextInput
          name="details"
          label="Details"
          value={project.details}
          onChange={onChange}
          error={errors.details}
        />

        <TextInput
          name="hours"
          label="Expected no. of hours"
          value={project.hours}
          type="number"
          onChange={onChange}
          error={errors.hours}
        />

        <TextInput
          name="lastDay"
          label="Last Day for bid"
          value={project.lastDay ? project.lastDay : date1.toLocaleDateString('en-CA')}
          type="date"
          onChange={onChange}
          error={errors.lastDay}
        />

        <TextInput
          name="lastTime"
          label="Last Time for bid"
          value={project.lastTime}
          type="time"
          onChange={onChange}
          error={errors.lastTime}
        />

        {project.id && project.bids && project.bids.length > 0 ? <h5 style={{ marginTop: 20 }}>Existing Bids:</h5> : <div />}

        {project.id  && project.bids ? project.bids.map(bid => {
          return (
            <div key={bid.bidId} style={{ marginTop: 5 }}>
              <b>Name:</b> {bid.bidder}, <b>Price:</b> {bid.hrate}
            </div>
          );
        }): <div/>}

        <button style={{ marginTop: 20 }} type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Post"}
        </button>
      </div>
    </form>
  );
};

AddNewProjectForm.propTypes = {
  project: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  date1: PropTypes.string
};

export default AddNewProjectForm;
