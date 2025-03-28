import { create } from "zustand";
import { Product } from "../types/product";
import axios from "axios";
import React from "react";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;

  formData: Omit<Product, "id" | "created_at">;
  setFormData: (formData: ProductStore["formData"]) => void;
  resetForm: () => void;

  fetchProducts: () => Promise<void>;
  fetchProduct: (id: number) => Promise<void>;
  addProduct: (e: React.FormEvent) => Promise<void>;
  updateProduct: (id: number) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  formData: {
    name: "",
    description: "",
    price: 0.0,
    stock: 0,
  },
  setFormData: (formData) => set({ formData }),
  resetForm: () =>
    set({ formData: { name: "", description: "", price: 0.0, stock: 0 } }),

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

  fetchProduct: async (id: number) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/api/products/${id}`);
      set({ formData: response.data.data, error: null });
    } catch (error) {
      console.log("Error in fetch products", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();

      const modal = document.getElementById(
        "addProductModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    } catch (error) {
      console.log("Error in fetch products", error);
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id: number) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.patch(`/api/products/${id}`, formData);
      set({ formData: response.data.data, error: null });
    } catch (error) {
      console.log("Error in update products", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id: number) => {
    set({ loading: true });
    try {
      await axios.delete(`/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
    } catch (error) {
      console.log("Error in update products", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },
}));
