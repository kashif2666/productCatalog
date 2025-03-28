import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/useProductStore";
import AddProductModal from "../components/AddProductModal";

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openAddProductModal = () => {
    const modal = document.getElementById(
      "addProductModal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <main className="mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary" onClick={openAddProductModal}>
          Add Product
        </button>
      </div>

      <AddProductModal />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
