import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  category: string;
  price: number;
  rating: number;
  // Add other properties of your product here
}

const FilterPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState<number | string>(""); // Changed to number or string
  const [maxPrice, setMaxPrice] = useState<number | string>(""); // Changed to number or string
  const [sortAttribute, setSortAttribute] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]); // State for storing product data

  // Example of fetching products from an API or using static data
  useEffect(() => {
    // Fetch products from an API or use static data
    const fetchProducts = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(``); 
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data: Product[] = await response.json();
        setProducts(data);  // Update the products state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to apply filters
  const applyFilters = () => {
    // Handle edge cases for empty or invalid price inputs
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setError("Minimum price cannot be greater than maximum price.");
      return;
    }
    if (Number(minPrice) < 0 || Number(maxPrice) < 0) {
      setError("Prices must be positive numbers.");
      return;
    }

    // Clear error and navigate with filters
    setError("");
    navigate("/", { state: { category, minPrice, maxPrice, sortAttribute, sortOrder } });
  };

  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (category !== "All") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === category.toLowerCase());
    }

    // Price filters
    if (minPrice !== "" && !isNaN(Number(minPrice))) {
      filtered = filtered.filter((product) => product.price >= Number(minPrice));
    }
    if (maxPrice !== "" && !isNaN(Number(maxPrice))) {
      filtered = filtered.filter((product) => product.price <= Number(maxPrice));
    }

    // Sorting logic
    if (sortOrder === "asc") {
      filtered.sort((a, b) => (a[sortAttribute as keyof Product] as number) - (b[sortAttribute as keyof Product] as number));
    } else {
      filtered.sort((a, b) => (b[sortAttribute as keyof Product] as number) - (a[sortAttribute as keyof Product] as number));
    }

    setFilteredProducts(filtered);
  }, [category, minPrice, maxPrice, sortAttribute, sortOrder, products]);

  return (
    <div className="p-4 bg-blue-50 h-screen">
      <h1 className="text-2xl font-bold mb-4">Filters</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category</h3>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Sorting Options */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          value={sortAttribute}
          onChange={(e) => setSortAttribute(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder("asc")}
            className={`w-1/2 p-2 rounded-md transition ${
              sortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200"
            } hover:bg-blue-600`}
          >
            Ascending
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`w-1/2 p-2 rounded-md transition ${
              sortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200"
            } hover:bg-blue-600`}
          >
            Descending
          </button>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 transition"
      >
        Apply Filters
      </button>

      {/* Filtered Products Display */}
      <div>
        <h2 className="text-xl mt-4">Filtered Products</h2>
        <ul>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <li key={index}>
                {product.category} - {product.price}
              </li>
            ))
          ) : (
            <p>No products found with the selected filters.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FilterPage;
