import { useState, useEffect } from "react";
import ProductsTable from "../components/ui/ProductsTable";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { products } from "../data/products";

function Products() {
  const [productList, setProductList] = useState(products);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category]);

  const productsPerPage = 10;

  const filteredProducts = productList.filter((product) => {
    const searchValue = searchTerm.toLowerCase();
    const matchSearch =
      product.name.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue);
    const matchCategory = category === "All" || product.category === category;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage),
  );

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  const categories = [
    "All",
    ...new Set(productList.map((product) => product.category)),
  ];

  const handleDelete = (id) => {
    setProductList(productList.filter((item) => item.id !== id));
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    console.log("Edit product:", id);
  };
  return (
    <div className="p-6 bg-surface-soft min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-ink">Products</h1>

      {/* Search--Filter */}

      <div className="flex gap-3 mb-6 w-full mx-auto">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-line bg-card text-ink focus:outline-none focus:ring-2 focus:ring-gold"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchTerm(search);
                setCurrentPage(1);
              }
            }}
          />
        </div>

        <div className="relative">
          <SlidersHorizontal
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 pl-10 pr-8 rounded-lg border border-line bg-card text-ink appearance-none
      focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSearchTerm(search);
            setCurrentPage(1);
          }}
          disabled={!search.trim()}
          className="flex items-center gap-2 h-11 px-4 bg-gold text-on-gold
    rounded-lg hover:bg-gold-deep disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {/*Table */}

      <ProductsTable
        products={currentProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Pagination */}

      <div className="w-full mx-auto flex justify-center items-center gap-4 p-4 border-t border-card-line bg-card rounded-b-2xl">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="p-2 rounded-lg border border-line hover:bg-surface-fields disabled:opacity-50 text-ink"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-ink-soft">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="p-2 rounded-lg border border-line hover:bg-surface-fields disabled:opacity-50 text-ink"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default Products;
