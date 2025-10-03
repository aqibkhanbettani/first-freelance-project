import React, { useRef } from "react";
import { FaRotateLeft } from "react-icons/fa6"; // ✅ Reset Icon

function NewCustomer() {
  const formRef = useRef(null);

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset(); // ✅ Reset only this form
    }
  };

  return (
    <div className="container mt-4">
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Add New Customer</h1>
        <button
          type="button"
          className="btn btn-secondary d-flex align-items-center"
          onClick={handleReset}
        >
          <FaRotateLeft className="me-2" />
          Reset
        </button>
      </div>

      <form ref={formRef}>
        {/* Row 1 - Name + Email (Email optional) */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter customer name"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email (optional)"
            />
          </div>
        </div>

        {/* Row 2 - CNIC + Phone */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter CNIC"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        {/* Row 3 - Address (full width, height 100px) */}
        <div className="row mb-3">
          <div className="col-12">
            <textarea
              className="form-control"
              placeholder="Enter address"
              style={{ height: "100px" }}
              required
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
