import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import service from '../../services/api';

interface ProductInterface {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  imageUrls: string;
}

function HomePage() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortAttribute, setSortAttribute] = useState<string>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch products
  useEffect(() => {
    setLoading(true);
    service.get('/products')
      .then((res) => {
        setProducts(res.data.data);
        setFilteredProducts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by price range
    if (minPrice !== '') {
      filtered = filtered.filter(product => product.price >= minPrice);
    }
    if (maxPrice !== '') {
      filtered = filtered.filter(product => product.price <= maxPrice);
    }

    // Sort by selected attribute
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => (a[sortAttribute as keyof ProductInterface] as number) - (b[sortAttribute as keyof ProductInterface] as number));
    } else {
      filtered.sort((a, b) => (b[sortAttribute as keyof ProductInterface] as number) - (a[sortAttribute as keyof ProductInterface] as number));
    }

    setFilteredProducts(filtered);
  }, [category, minPrice, maxPrice, sortAttribute, sortOrder, products]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 h-auto sticky top-14 bg-blue-50 p-4 shadow-md overflow-y-auto mb-4 md:mb-0">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Category Filter */}
        <div className="mb-6">
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
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value) || '')}
              className="w-1/2 border border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value) || '')}
              className="w-1/2 border border-gray-300 rounded-md p-2"
            />
          </div>
          <p className="mt-2">Price Range: {minPrice ? `Min: ${minPrice}` : 'No Min'} - {maxPrice ? `Max: ${maxPrice}` : 'No Max'}</p>
        </div>

        {/* Sorting Options */}
        <div>
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
              onClick={() => setSortOrder('asc')}
              className={`w-1/2 p-2 rounded-md ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Ascending
            </button>
            <button
              onClick={() => setSortOrder('desc')}
              className={`w-1/2 p-2 rounded-md ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Descending
            </button>
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <div className="flex-1 py-10 md:ml-1/4 flex flex-wrap justify-center gap-4 overflow-y-auto h-screen">
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start w-60 text-left">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.imageUrls}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
                />
              </Link>
              <div className="justify-between items-center w-full">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-lg text-gray-900">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
