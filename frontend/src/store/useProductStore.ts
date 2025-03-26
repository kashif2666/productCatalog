import { create } from "zustand";
import { Product } from "../types/product";
import axios from "axios";



interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`/api/products`);
      set({ products: response.data.data, error: null });
    } catch (error) {
      console.log("Error in fetch products", error);
    } finally {
      set({ loading: false });
    }
  },
}));
