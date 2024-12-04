import { useNavigate } from "react-router-dom";
// import AddIcon from '@mui/icons-material/Add';
const Header = () => {
  const navigate = useNavigate();

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
      <input
        type="text"
        placeholder="Search..."
        className="hidden md:block border rounded-md p-2 w-1/2"
      />

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
