import {
  Package,
  SquarePen,
  Trash2,
} from "lucide-react";

function ProductsTable({ products, onDelete, onEdit }) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-md w-[80%] mx-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-100/70">
            <th className="p-4 text-left text-sm font-semibold text-gray-600">
              Product
            </th>

            <th className="p-4 text-left text-sm font-semibold text-gray-600">
              Category
            </th>

            <th className="p-4 text-left text-sm font-semibold text-gray-600">
              Price
            </th>

            <th className="p-4 text-left text-sm font-semibold text-gray-600">
              Stock
            </th>

            <th className="p-4 text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                    <Package size={24} />
                  </div>

                  <span className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </span>
                </td>

                <td className="p-4 text-gray-600">
                  {product.category}
                </td>

                <td className="p-4 text-gray-600">
                  ${product.price}
                </td>

                <td className="p-4 text-gray-600">
                  {product.stock}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <SquarePen size={19} />
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
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