import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortAttribute, setSortAttribute] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  // Function to apply filters and redirect to the home page
  const applyFilters = () => {
    // You can pass the filter parameters as query params
    navigate("/", { state: { category, minPrice, maxPrice, sortAttribute, sortOrder } });
  };

  return (
    <div className="p-4 bg-blue-50 h-screen">
      <h1 className="text-xl font-bold mb-4">Filters</h1>

      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category</h3>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      {/* Sorting Options */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          value={sortAttribute}
          onChange={(e) => setSortAttribute(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder("asc")}
            className={`w-1/2 p-2 rounded-md ${
              sortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Ascending
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`w-1/2 p-2 rounded-md ${
              sortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Descending
          </button>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-blue-500 text-white p-2 rounded-md mt-4"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPage;
