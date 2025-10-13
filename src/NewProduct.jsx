import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // 🧠 Load product from localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const found = savedProducts.find((p) => p.id === Number(id));
    if (!found) {
      toast.error("Product not found!");
      navigate("/products");
      return;
    }
    setProduct(found);
  }, [id, navigate]);

  // ✍️ Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "stock" || name === "sold" || name === "cost" || name === "price"
          ? Number(value)
          : value,
    }));
  };

  // 💾 Save changes
  const handleSave = () => {
    if (!product) return;

    if (!product.name || !product.category) {
      toast.warning("Please fill all required fields!");
      return;
    }

    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updated = savedProducts.map((p) =>
      p.id === product.id ? product : p
    );
    localStorage.setItem("products", JSON.stringify(updated));

    toast.success("✅ Product updated successfully!");
    navigate("/products");
  };

  if (!product)
    return (
      <div className="container mt-5 text-center">
        <p>Product not found.</p>
        <button className="btn btn-dark" onClick={() => navigate("/products")}>
          <FaArrowLeft className="me-2" />
          Back to Products
        </button>
      </div>
    );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Edit Product #{product.id}</h2>
        <button className="btn btn-dark" onClick={() => navigate("/products")}>
          <FaArrowLeft className="me-2" />
          Back
        </button>
      </div>

      <div className="card p-4 shadow-sm">
        <div className="row g-3">
          {[
            { label: "Product Name", name: "name", type: "text" },
            { label: "Category", name: "category", type: "text" },
            { label: "Stock", name: "stock", type: "number" },
            { label: "Sold", name: "sold", type: "number" },
            { label: "Cost (PKR)", name: "cost", type: "number" },
            { label: "Price (PKR)", name: "price", type: "number" },
          ].map((field, idx) => (
            <div className="col-md-6" key={idx}>
              <label className="form-label fw-bold">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={product[field.name]}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          ))}

          <div className="col-md-6">
            <label className="form-label fw-bold">Created At</label>
            <input
              type="date"
              name="createdAt"
              value={new Date(product.createdAt).toISOString().split("T")[0]}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-success px-4" onClick={handleSave}>
            💾 Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
