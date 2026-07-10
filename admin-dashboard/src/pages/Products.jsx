import { useState } from "react";
import {
  Package,
  Search,
  SlidersHorizontal,
  SquarePen,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { products } from "../data/products";

function Products() {
  const [productList, setProductList] = useState(products);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const totalPages = Math.ceil(
  productList.length / productsPerPage
  );
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = productList.slice(
  firstIndex,
  lastIndex
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Products
      </h1>

      {/* search--filter */}

      <div className="flex gap-3 mb-6  w-[80%] mx-auto">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <SlidersHorizontal size={18} />
          Filters
        </button>


        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Search size={18} />
          Search
        </button>
      </div>


      {/* Card */}

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

            {productList.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              currentProducts.map((product) => (
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

                  {/* edit--delete */}
                  
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <SquarePen size={19} />
                      </button>


                      <button
                        onClick={() =>
                        setProductList(
                        productList.filter(
                        (item) => item.id !== product.id
                        )
                          )
                            }
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
        

        <div className="flex justify-center items-center gap-4 p-4 border-t">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
          >
          <ChevronLeft size={20} />
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
          >
          <ChevronRight size={20} />
          </button>
        </div>




      </div>

    </div>
  );
}

export default Products;