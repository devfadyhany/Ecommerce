import { Package, SquarePen, Trash2 } from "lucide-react";

function ProductsTable({ products, onDelete, onEdit }) {
  return (
    <div className="overflow-x-scroll bg-card rounded-t-2xl border border-card-line shadow-md w-full mx-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-card-line bg-surface-fields">
            <th className="p-4 text-left text-sm font-semibold text-ink-soft">
              Product
            </th>

            <th className="p-4 text-left text-sm font-semibold text-ink-soft">
              Category
            </th>

            <th className="p-4 text-left text-sm font-semibold text-ink-soft">
              Price
            </th>

            <th className="p-4 text-left text-sm font-semibold text-ink-soft">
              Stock
            </th>

            <th className="p-4 text-left text-sm font-semibold text-ink-soft">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-ink-soft">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-card-line hover:bg-surface-fields transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <div className="p-3 rounded-full bg-gold-light text-gold-deep">
                    <Package size={24} />
                  </div>

                  <span className="font-semibold text-lg text-ink">
                    {product.name}
                  </span>
                </td>

                <td className="p-4 text-ink-soft">{product.category}</td>

                <td className="p-4 text-ink-soft">${product.price}</td>

                <td className="p-4 text-ink-soft">{product.stock}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product._id)}
                      className="p-2 text-gold hover:bg-gold-light rounded-lg transition"
                      title="Edit"
                    >
                      <SquarePen size={19} />
                    </button>

                    <button
                      onClick={() => onDelete(product)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
