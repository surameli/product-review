
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-blue-50 sticky top-0 z-10 overflow-x-auto">
      <div
        className="text-2xl font-bold ml-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Product <span className="text-blue-600">Review</span>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-md p-2 w-1/2"
      />
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/add-product")}
        >
          Add Product
        </button>
      </div>
    </header>
  );
};

export default Header;
