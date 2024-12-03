
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import Header from "./components/Header/Header";
import AddProduct from "./components/AddProduct/AddProduct"
import UpdateProductPage from "./components/UpdateProductPage/UpdateProductPage"
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/update-product/:id" element={<UpdateProductPage />} />
          </Routes>
        </>
        <footer className="bg-gray-800 text-white text-center py-4">
          © 2024 Product Review App
        </footer>
      </div>
    </Router>
  );
};

export default App;
