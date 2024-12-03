import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState<{
    name: string;
    description: string;
    price: string;
    category: string;
    tags: string[]; // Explicitly define tags as string[]
    use: string;
    minimumQuantity: string;
    sellingPrice: string;
    addedBy: string;
    expiresAt: string;
    quantityOnHand: string;
    reservedQuantity: string;
    discount: string;
    imageUrls: string[]; // Explicitly define imageUrls as string[]
  }>({
    name: "",
    description: "",
    price: "",
    category: "",
    tags: [],
    use: "",
    minimumQuantity: "",
    sellingPrice: "",
    addedBy: "",
    expiresAt: "",
    quantityOnHand: "",
    reservedQuantity: "",
    discount: "",
    imageUrls: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure proper payload
    const payload = {
      name: product.name.trim(),
      description: product.description.trim(),
      price: parseFloat(product.price) || 0,
      category: product.category.trim(),
      tags: product.tags.filter((tag: string) => tag.trim() !== ""), // Remove empty tags
      use: product.use.trim(),
      minimumQuantity: parseInt(product.minimumQuantity, 10) || 0,
      sellingPrice: parseFloat(product.sellingPrice) || 0,
      addedBy: product.addedBy.trim(),
      expiresAt: product.expiresAt.trim(),
      quantityOnHand: parseInt(product.quantityOnHand, 10) || 0,
      reservedQuantity: parseInt(product.reservedQuantity, 10) || 0,
      discount: parseFloat(product.discount) || 0,
      imageUrls: product.imageUrls.filter((url: string) => url.trim() !== ""), // Remove empty URLs
    };

    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post(
        "https://test-api.nova-techs.com/products",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response from server:", response.data);
      alert("Product added successfully!");
      // Reset form
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        tags: [],
        use: "",
        minimumQuantity: "",
        sellingPrice: "",
        addedBy: "",
        expiresAt: "",
        quantityOnHand: "",
        reservedQuantity: "",
        discount: "",
        imageUrls: [],
      });
    } catch (error: unknown) {
      console.error("Failed to add product:", error);
      if (error instanceof Error) {
        alert(`Error: ${error.message || "Failed to add product"}`);
      } else {
        alert("Network or server error occurred.");
      }
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Add Product</h1>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleTextAreaChange}
          className="border rounded-md p-2 w-full"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={product.tags.join(", ")}
          onChange={(e) =>
            setProduct({ ...product, tags: e.target.value.split(",") })
          }
          className="border rounded-md p-2 w-full"
        />
        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          value={product.sellingPrice}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />

        <input
          type="text"
          name="use"
          placeholder="Use"
          value={product.use}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        <input
          type="number"
          name="minimumQuantity"
          placeholder="Minimum Quantity"
          value={product.minimumQuantity}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="addedBy"
          placeholder="Added By"
          value={product.addedBy}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        <input
          type="date"
          name="expiresAt"
          value={product.expiresAt}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        <input
          type="number"
          name="quantityOnHand"
          placeholder="Quantity on Hand"
          value={product.quantityOnHand}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        <input
          type="number"
          name="reservedQuantity"
          placeholder="Reserved Quantity"
          value={product.reservedQuantity}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={product.discount}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="imageUrls"
          placeholder="Image URLs (comma-separated)"
          value={product.imageUrls.join(", ")}
          onChange={(e) =>
            setProduct({ ...product, imageUrls: e.target.value.split(",") })
          }
          className="border rounded-md p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
