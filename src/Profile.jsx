import React, { useState } from "react";

function Profile() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    fatherName: "",
    address: "",
    date: "",
    products: "", // now text type
    totalPayment: "",
    pay: "",
    reminder: "",
  });

  const [profiles, setProfiles] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (field, value) => {
    let updatedForm = { ...form, [field]: value };

    // Auto-calculate reminder when pay or totalPayment changes
    if (field === "pay" || field === "totalPayment") {
      const total = parseValue(updatedForm.totalPayment);
      const pay = parseValue(updatedForm.pay);
      updatedForm.reminder = total - pay >= 0 ? total - pay : 0;
    }

    setForm(updatedForm);
  };

  const parseValue = (val) => (val === "" ? 0 : Number(val));

  const handleAddOrUpdate = () => {
    if (!form.id || !form.name) {
      alert("Please enter at least ID and Name!");
      return;
    }

    if (editIndex !== null) {
      const updatedProfiles = [...profiles];
      updatedProfiles[editIndex] = form;
      setProfiles(updatedProfiles);
      setEditIndex(null);
    } else {
      setProfiles((prev) => [...prev, form]);
    }

    setForm({
      id: "",
      name: "",
      fatherName: "",
      address: "",
      date: "",
      products: "",
      totalPayment: "",
      pay: "",
      reminder: "",
    });
  };

  const handleEdit = (index) => {
    setForm(profiles[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setProfiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Totals
  const totalPayments = profiles.reduce(
    (sum, p) => sum + parseValue(p.totalPayment),
    0
  );
  const totalPay = profiles.reduce((sum, p) => sum + parseValue(p.pay), 0);
  const totalReminder = profiles.reduce(
    (sum, p) => sum + parseValue(p.reminder),
    0
  );

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4">
        {editIndex !== null ? "Edit Profile" : "Add Personal Profile"}
      </h2>

      {/* Input Form */}
      <div
        className="card shadow-sm p-4 mb-4"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        {[
          "id",
          "name",
          "fatherName",
          "address",
          "date",
          "products",
          "totalPayment",
          "pay",
        ].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field === "fatherName"
                ? "Father Name"
                : field === "products"
                ? "Products (Text)"
                : field === "totalPayment"
                ? "Total Payment ($)"
                : field === "pay"
                ? "Pay ($)"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={
                field === "date"
                  ? "date"
                  : ["totalPayment", "pay"].includes(field)
                  ? "number"
                  : "text"
              }
              className="form-control"
              value={form[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        {/* Reminder (Read-only) */}
        <div className="mb-3">
          <label className="form-label">Reminder ($)</label>
          <input
            type="number"
            className="form-control"
            value={form.reminder}
            readOnly
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update Profile" : "Add Profile"}
        </button>
      </div>

      {/* Saved Profiles */}
      <h3 className="fw-bold mb-3">Profiles List</h3>
      {profiles.length === 0 ? (
        <p className="text-muted">No profiles added yet.</p>
      ) : (
        <>
          {profiles.map((p, index) => (
            <div
              key={index}
              className="card shadow-sm p-3 mb-3"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              <ul className="list-group mb-3">
                <li className="list-group-item">
                  <strong>ID:</strong> {p.id}
                </li>
                <li className="list-group-item">
                  <strong>Name:</strong> {p.name}
                </li>
                <li className="list-group-item">
                  <strong>Father Name:</strong> {p.fatherName}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {p.address}
                </li>
                <li className="list-group-item">
                  <strong>Date:</strong> {p.date}
                </li>
                <li className="list-group-item">
                  <strong>Products:</strong> {p.products || "-"}
                </li>
                <li className="list-group-item">
                  <strong>Total Payment:</strong> ${p.totalPayment || 0}
                </li>
                <li className="list-group-item">
                  <strong>Pay:</strong> ${p.pay || 0}
                </li>
                <li className="list-group-item">
                  <strong>Reminder:</strong>{" "}
                  <span
                    className={
                      parseValue(p.reminder) === 0
                        ? "text-success fw-bold"
                        : "text-danger fw-bold"
                    }
                  >
                    ${p.reminder || 0}
                  </span>
                </li>
              </ul>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning flex-fill"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger flex-fill"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Totals Summary */}
          <div
            className="alert alert-info fw-bold mt-4"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            Total Payments: ${totalPayments} <br />
            Total Pay: ${totalPay} <br />
            Total Reminder: ${totalReminder}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
