import React, { useState } from "react";

function Newsala() {
  const [isInstallment, setIsInstallment] = useState("no"); // default "no"
  const [numInstallments, setNumInstallments] = useState("");

  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-4">Add New Sale</h1>

      <form>
        {/* Row 1 - Select Customer + Product */}
        <div className="row mb-3">
          <div className="col-md-6">
            <select className="form-select">
              <option value="">Select Customer</option>
              <option value="1">Ali Khan</option>
              <option value="2">Sara Ahmed</option>
              <option value="3">Usman Ali</option>
            </select>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
            />
          </div>
        </div>

        {/* Row 2 - Selling Price + Original Price */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Selling Price"
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Original Price"
            />
          </div>
        </div>

        {/* Row 3 - Purchase Price + Paid Amount */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Purchase Price"
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Paid Amount"
            />
          </div>
        </div>

        {/* Row 4 - Payment Type + Installment */}
        <div className="row mb-3">
          <div className="col-md-6">
            <select className="form-select">
              <option value="">Select Payment Type</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={isInstallment}
              onChange={(e) => setIsInstallment(e.target.value)}
            >
              <option value="no">Installment: No</option>
              <option value="yes">Installment: Yes</option>
            </select>
          </div>
        </div>

        {/* Row 5 - No. of Installments + Date (same row) */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="No. of Installments"
              value={numInstallments}
              onChange={(e) => setNumInstallments(e.target.value)}
              disabled={isInstallment !== "yes"} // 🔹 disable if not "yes"
            />
          </div>
          <div className="col-md-6">
            <input type="date" className="form-control" />
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

export default Newsala;
