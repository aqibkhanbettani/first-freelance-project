// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function UpdateCustomer() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [customer, setCustomer] = useState({ name:"", phone:"", cnic:"", email:"", address:"" });

//   useEffect(() => {
//     const customers = JSON.parse(localStorage.getItem("customers")) || [];
//     const c = customers.find(c => c.sno === parseInt(id));
//     if (!c) {
//       alert("Customer not found!");
//       navigate("/customers");
//     } else setCustomer(c);
//   }, [id, navigate]);

//   const handleChange = e => setCustomer({ ...customer, [e.target.name]: e.target.value });

//   const handleSubmit = e => {
//     e.preventDefault();
//     const customers = JSON.parse(localStorage.getItem("customers")) || [];
//     const updated = customers.map(c => c.sno === parseInt(id) ? customer : c);
//     localStorage.setItem("customers", JSON.stringify(updated));
//     alert("Customer updated!");
//     navigate("/customers");
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-3">Update Customer</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           value={customer.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className="form-control mb-4"
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           value={customer.phone}
//           onChange={handleChange}
//           placeholder="Phone"
//           className="form-control mb-4"
//           required
//         />
//         <input
//           type="text"
//           name="cnic"
//           value={customer.cnic}
//           onChange={handleChange}
//           placeholder="CNIC"
//           className="form-control mb-4"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={customer.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="form-control mb-4"
//         />
//         <textarea
//           name="address"
//           value={customer.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="form-control mb-4"
//           rows="3"
//           required
//         />
//         <button type="submit" className="btn btn-dark me-2">Update</button>
//         <button type="button" className="btn btn-secondary" onClick={() => navigate("/customers")}>Cancel</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateCustomer;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    cnic: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch single customer from backend
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/customers/${id}`
        );

        if (response.data.success && response.data.data) {
          setCustomer(response.data.data);
        } else {
          toast.error("Customer not found!");
          navigate("/customers");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch customer details!");
        navigate("/customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, navigate]);

  const handleChange = (e) =>
    setCustomer({ ...customer, [e.target.name]: e.target.value });

  // ✅ Submit updated data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/customers/${id}`,
        customer
      );

      if (response.data.success) {
        toast.success("Customer updated successfully!");
        setTimeout(() => navigate("/customers"), 1500);
      } else {
        toast.warn("Failed to update customer!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message || "Server error while updating customer!");
    }
  };

  if (loading)
    return <div className="text-center mt-5">Loading customer data...</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Update Customer</h1>
      <div className="d-flex container-fluid">
        <img src="https://cdn-icons-png.freepik.com/512/17/17797.png" alt="Update Customer image" style={{ maxWidth: "250px", maxHeight: "250px" }} />
        <form onSubmit={handleSubmit} className="container-fluid">
          <label htmlFor="name" style={{opacity:"0.5"}}>Name</label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-control mb-3"
            required
          />
          <label htmlFor="phone" style={{opacity:"0.5"}}>Phone</label>
          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="form-control mb-3"
            required
          />
          <label htmlFor="cnic" style={{opacity:"0.5"}}>CNIC</label>
          <input
            type="text"
            name="cnic"
            value={customer.cnic}
            onChange={handleChange}
            placeholder="CNIC"
            className="form-control mb-3"
            required
          />
          <label htmlFor="email" style={{opacity:"0.5"}}>Email (optional)</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control mb-3"
          />
          <label htmlFor="address" style={{opacity:"0.5"}}>Address</label>
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="Address"
            className="form-control mb-3"
            rows="3"
            required
          />
          <button type="submit" className="btn btn-dark me-2">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/customers")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCustomer;
