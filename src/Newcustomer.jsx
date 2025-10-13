import React, { useEffect, useRef } from "react";
import { FaRotateLeft } from "react-icons/fa6"; // ✅ Reset Icon
import axios from "axios"
import { toast } from 'react-toastify';
function NewCustomer() {
  const formRef = useRef(null);

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset(); // ✅ Reset only this form
    }
  };

  const createCustomer = async (e) => {
    e.preventDefault(); // Prevent default form submission

    console.log(e.target)

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const customerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      cnic: formData.get("cnic"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND + "/api/customers",
        customerData
      );

      console.log("Customer created successfully:", response.data);
      toast.success("Customer created successfully!");
      form.reset(); // Clear form
    } catch (error) {
      console.error("Error submitting form:", error);

      // Handle server or validation error
      if (error.response) {
        // Server responded with a non-2xx status
        toast.error(error.response.data.message || "Server error");
      } else if (error.request) {
        // Request was made but no response
        toast.error("No response from server");
      } else {
        // Something else happened
        toast.error("Error: " + error.message);
      }
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

      <form ref={formRef} onSubmit={createCustomer}>
        {/* Row 1 - Name + Email (Email optional) */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter customer name"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              name="email"
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
              name="cnic"
              className="form-control"
              placeholder="Enter CNIC"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="phone"
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
              name="address"
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
