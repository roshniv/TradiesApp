import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AddBidToProject = ({
  project,
  onSave,
  onChange,
  saving = false,
  errors = {},
  newBid = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>Add Bid To Project</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}   
      {project.bids && project.bids.length > 0 ? <h6>Previous Bids:</h6> : <div />}
      {project.bids && project.bids.length > 0 ? project.bids.map(bid => {
          return (
            <div key={bid.bidId} style={{ marginTop: 5 }}>
              <b>Name:</b> {bid.bidder}, <b>Price: </b>{bid.hrate}
            </div>
          );
        }) : <div />
      }    
      <div style={{ marginTop: 20 }}>
        <TextInput
          name="bidder"
          label="Bidder Name"
          value={newBid.bidder}
          onChange={onChange}
          error={errors.bidder}
        />

        <TextInput
          name="hrate"
          label="Hourly rates(in AUD)"
          value={newBid.hrate}
          onChange={onChange}
          error={errors.hrate}
        />

        <button style={{ marginTop: 20 }} type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Post Bid"}
        </button>
      </div>
    </form>
  );
};

AddBidToProject.propTypes = {
  project: PropTypes.object,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  newBid: PropTypes.object
};

export default AddBidToProject;
