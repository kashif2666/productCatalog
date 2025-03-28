import { SaveIcon, Trash2Icon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    formData,
    fetchProduct,
    resetForm,
    setFormData,
    updateProduct,
    deleteProduct,
    loading,
    error,
  } = useProductStore();

  useEffect(() => {
    if (id) {
      fetchProduct(Number(id));
    }
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (
      id &&
      window.confirm("Are you sure you want to delete this product ?")
    ) {
      await deleteProduct(Number(id));
      navigate("/");
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl justify-items-center">
      <button
        onClick={() => navigate("/")}
        className="btn btn-success btn-outline mb-8 absolute"
      >
        Back to Product
      </button>

      <div className="card bg-slate-500 text-primary-content w-1/2 mt-20 bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Edit Product</h2>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (id) {
                updateProduct(Number(id));
              }
            }}
          >
            {/* PRODUCT NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium my-1">
                  Product Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="input input-bordered w-full my-1"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* PRODUCT Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium my-1">
                  Product Description
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter product description"
                className="input input-bordered w-full my-1"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* PRODUCT PRICE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium my-1">
                  Price
                </span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="$ 0.00"
                className="input input-bordered w-full my-1"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
              />
            </div>

            {/* PRODUCT STOCK */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium my-1">
                  Stock
                </span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="0"
                className="input input-bordered w-full my-1"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
              />
            </div>

            {/* FORM ACTIONS */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="btn btn-error"
                onClick={handleDelete}
              >
                <Trash2Icon className="size-4 mr-2" />
                Delete Product
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => navigate("/")}
              >
                <SaveIcon className="size-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
