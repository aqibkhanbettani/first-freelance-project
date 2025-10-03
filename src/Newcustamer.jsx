import React from "react";

function NewCustomer() {
  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-4">Add New Customer</h1>

      <form>
        {/* Row 1 - Name */}
        <div className="row mb-3">
          <div className="col-12">
         
            <input
              type="text"
              className="form-control"
              placeholder="Enter customer name"
            />
          </div>
        </div>

        {/* Row 2 - CNIC */}
        <div className="row mb-3">
          <div className="col-12">
          
            <input
              type="text"
              className="form-control"
              placeholder="Enter CNIC"
            />
          </div>
        </div>

        {/* Row 3 - Phone */}
        <div className="row mb-3">
          <div className="col-12">
         
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Row 4 - Address */}
        <div className="row mb-3">
          <div className="col-12">
          
            <textarea
              className="form-control"
              rows="2"
              placeholder="Enter address"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="row">
          <div className="col-12">
            <button type="submit" className="btn btn-dark w-100">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewCustomer;
