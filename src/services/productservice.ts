import api from "./api";

export const fetchProducts = async (filters = {}) => {
  const response = await api.get("/products", { params: filters });
  return response.data;
};

export const fetchProductDetails = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data: any) => {
  const response = await api.post("/products", data);
  return response.data;
};

export const updateProduct = async (id: string, updates: any) => {
  const response = await api.patch(`/products/${id}`, updates);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
