import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  use: string;
  minimumQuantity: number;
  sellingPrice: number;
  addedBy: string;
  expiresAt: string;
  quantityOnHand: number;
  reservedQuantity: number;
  discount: number;
  imageUrls: string[]; // Image URLs stored here
}

const UpdateProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://test-api.nova-techs.com/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Error fetching product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!product) return;

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", product.category);
    formData.append("use", product.use);
    formData.append("minimumQuantity", product.minimumQuantity.toString());
    formData.append("sellingPrice", product.sellingPrice.toString());
    formData.append("expiresAt", product.expiresAt);
    formData.append("tags", product.tags.join(","));
    formData.append("addedBy", product.addedBy);
    formData.append("quantityOnHand", product.quantityOnHand.toString());
    formData.append("reservedQuantity", product.reservedQuantity.toString());
    formData.append("discount", product.discount.toString());
    formData.append("imageUrls", JSON.stringify(product.imageUrls));

    try {
      await axios.patch(
        `https://test-api.nova-techs.com/products/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Product updated successfully!");
      navigate(`/product/${id}`);
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product. Please try again.");
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof Product, value: any) => {
    setProduct((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  // Handle image URL change
  const handleImageUrlChange = (index: number, value: string) => {
    setProduct((prev) => {
      if (!prev) return null;
      const updatedImageUrls = [...prev.imageUrls];
      updatedImageUrls[index] = value;
      return { ...prev, imageUrls: updatedImageUrls };
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={product?.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={product?.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
        </div>

        {/* Price, Minimum Quantity, Selling Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[{ label: "Price", field: "price" }, { label: "Minimum Quantity", field: "minimumQuantity" }, { label: "Selling Price", field: "sellingPrice" }].map(
            ({ label, field }) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  id={field}
                  type="number"
                  value={(product as any)[field] || ""}
                  onChange={(e) =>
                    handleInputChange(field as keyof Product, Number(e.target.value))
                  }
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={product?.category || ""}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            value={product?.tags.join(", ") || ""}
            onChange={(e) =>
              handleInputChange("tags", e.target.value.split(",").map((tag) => tag.trim()))
            }
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Use */}
        <div>
          <label htmlFor="use" className="block text-sm font-medium text-gray-700">
            Use
          </label>
          <select
            id="use"
            value={product?.use || "for_rent"}
            onChange={(e) => handleInputChange("use", e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="for_rent">For Rent</option>
            <option value="for_sale">For Sale</option>
          </select>
        </div>

        {/* Expiration Date */}
        <div>
          <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700">
            Expiration Date
          </label>
          <input
            id="expiresAt"
            type="datetime-local"
            value={product ? new Date(product.expiresAt).toISOString().slice(0, 16) : ""}
            onChange={(e) => handleInputChange("expiresAt", e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image URLs */}
        <div>
          <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">
            Image URLs
          </label>
          {product?.imageUrls.map((url, index) => (
            <div key={index} className="flex space-x-2 items-center">
              <input
                type="text"
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className=" w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductPage;
