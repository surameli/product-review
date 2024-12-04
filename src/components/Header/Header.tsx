import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search"; // Search icon from Material UI
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Search for products by name
  const searchProduct = async () => {
    if (searchQuery.trim() === "") return; // Do not search if input is empty

    try {
      const response = await axios.get(
        `https://test-api.nova-techs.com/products?name=${searchQuery}`
      );
      const data = response.data; // Axios automatically parses the JSON
        console.log(response.data.data);
        
      if (data.length > 0) {
        // Navigate to the search results page and pass the search results
        navigate(`/search?query=${searchQuery}`, { state: { products: data } });
      } else {
        alert("No products found.");
      }
    } catch (error) {
      console.error("Error searching for products:", error);
      alert("Error occurred while searching.");
    }
  };

  // Handle form submission (optional, if you want the user to press Enter)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProduct();
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-blue-50 sticky top-0 z-10 overflow-x-auto">
      {/* Logo */}
      <div
        className="text-3xl font-extrabold cursor-pointer transition-transform transform hover:scale-105 hover:text-blue-600"
        onClick={() => navigate("/")}
      >
        Product <span className="text-blue-600">Review</span>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex w-full max-w-lg items-center">
        <input
          type="text"
          placeholder="Search for products..."
          className="hidden md:block border rounded-md p-2 w-full"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* Mobile Search Input */}
        <input
          type="text"
          placeholder="Search for products..."
          className="block md:hidden border rounded-md p-2 w-full"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2 rounded-md"
          onClick={searchProduct}
        >
          <SearchIcon />
        </button>
      </form>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-1 py-2 rounded-md"
          onClick={() => navigate("/add-product")}
        >
          Add Product
        </button>

        {/* Mobile Filter Button */}
        <button
          className="md:hidden bg-blue-500 text-white px-4 py-1 rounded-md"
          onClick={() => navigate("/filter")}
        >
          Filters
        </button>
      </div>
    </header>
  );
};

export default Header;
