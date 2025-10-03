import React from "react";

function NewOrder() {
  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-4">Add New Product</h1>

      <form>
        {/* Row 1 - Name */}
        <div className="row mb-3">
          <div className="col-12">
        
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
            />
          </div>
        </div>

        {/* Row 2 - Category + Brand */}
        <div className="row mb-3">
          <div className="col-md-6">
        
            <select className="form-select">
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="appliances">Appliances</option>
              <option value="furniture">Furniture</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>
          <div className="col-md-6">
         
            <select className="form-select">
              <option value="">Select brand</option>
              <option value="samsung">Samsung</option>
              <option value="apple">Apple</option>
              <option value="sony">Sony</option>
              <option value="lg">LG</option>
            </select>
          </div>
        </div>

        {/* Row 3 - Selling Price + Buying Price */}
        <div className="row mb-3">
          <div className="col-md-6">
       
            <input
              type="number"
              className="form-control"
              placeholder="Enter selling price"
            />
          </div>
          <div className="col-md-6">
       
            <input
              type="number"
              className="form-control"
              placeholder="Enter buying price"
            />
          </div>
        </div>

        {/* Row 4 - Stock Quantity */}
        <div className="row mb-3">
          <div className="col-md-5">
          
            <input
              type="number"
              className="form-control"
              placeholder="Enter stock quantity"
            />
          </div>
        </div>

        {/* Row 5 - Submit Button */}
        <div className="row">
          <div className="col-md-12 mx-auto">
            <button type="submit" className="btn btn-dark w-100">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewOrder;
