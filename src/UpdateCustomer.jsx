import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({ name:"", phone:"", cnic:"", email:"", address:"" });

  useEffect(() => {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const c = customers.find(c => c.sno === parseInt(id));
    if (!c) {
      alert("Customer not found!");
      navigate("/customers");
    } else setCustomer(c);
  }, [id, navigate]);

  const handleChange = e => setCustomer({ ...customer, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const updated = customers.map(c => c.sno === parseInt(id) ? customer : c);
    localStorage.setItem("customers", JSON.stringify(updated));
    alert("Customer updated!");
    navigate("/customers");
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Update Customer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="cnic"
          value={customer.cnic}
          onChange={handleChange}
          placeholder="CNIC"
          className="form-control mb-2"
          required
        />
        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-control mb-2"
        />
        <textarea
          name="address"
          value={customer.address}
          onChange={handleChange}
          placeholder="Address"
          className="form-control mb-2"
          rows="3"
          required
        />
        <button type="submit" className="btn btn-dark me-2">Update</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/customers")}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
