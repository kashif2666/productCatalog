import { PlusCircleIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const AddProductModal = () => {
  const { formData, setFormData, addProduct, loading, error } =
    useProductStore();

  return (
    <dialog id="addProductModal" className="modal">
      <div className="modal-box">
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() =>
            (
              document.getElementById("addProductModal") as HTMLDialogElement
            )?.close()
          }
        >
          ✕
        </button>
        <h3 className="font-bold text-xl mb-8">Add New Product</h3>

        {/* Form */}

        <form className="space-y-6">
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
          <div className="modal-action flex justify-between mt-8">
            <button
              type="button"
              className="btn btn-error"
              onClick={() =>
                (
                  document.getElementById(
                    "addProductModal"
                  ) as HTMLDialogElement
                )?.close()
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={addProduct}
              disabled={
                !formData.name ||
                !formData.description ||
                !formData.price ||
                !formData.stock
              }
            >
              <PlusCircleIcon className="size-4 mr-2" />
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddProductModal;
