import { Link } from "react-router-dom";
import { EditIcon, Trash2Icon } from "lucide-react";
import { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="card bg-slate-600 text-primary-content w-96">
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <p>$ {product.price}</p>
        <p>{product.stock}</p>

        <div className="card-actions justify-end">
          <Link to={`/product/1`} className="btn btn-sm btn-info btn-outline">
            <EditIcon className="size-4" />
          </Link>
          <button className="btn btn-sm btn-error btn-outline">
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
