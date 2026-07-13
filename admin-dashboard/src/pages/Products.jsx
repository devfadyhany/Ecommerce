import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

import ProductsHeader from "../components/ui/ProductsHeader";
import ProductStats from "../components/ui/ProductStats";
import ProductsFilterBar from "../components/ui/ProductsFilterBar";
import ProductsTable from "../components/ui/ProductsTable";
import DeleteConfirmationModal from "../components/ui/DeleteConfirmationModal";

import api from "../api/axios";

const PAGE_SIZE = 10;

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = {
          page: currentPage,
          limit: PAGE_SIZE,
          search: searchTerm,
          category: category != "All" ? category : "",
          subcategory,
        };

        const response = await api.get("/products", { params });
        const data = response.data;
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
      } catch (err) {
        showErrorToast("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm, category, subcategory, currentPage]);

  const handleSearchSubmit = () => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (value) => {
    setSubcategory(value);
    setCurrentPage(1);
  };

  const handleDeleteRequest = (product) => {
    setDeleteTarget(product);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const id = deleteTarget._id || deleteTarget.id;

    const prevProducts = products;
    const prevTotal = totalProducts;

    setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    setTotalProducts((prev) => prev - 1);
    setDeleteTarget(null);

    try {
      await api.delete(`/products/${id}`);
    } catch (err) {
      setProducts(prevProducts);
      setTotalProducts(prevTotal);
      console.error("Delete failed:", err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  return (
    <div className="p-8">
      <ProductsHeader />
      <ProductStats products={products} totalProducts={totalProducts} />

      <div className="bg-surface-soft min-h-screen mt-8">
        <ProductsFilterBar
          search={search}
          setSearch={setSearch}
          onSearchSubmit={handleSearchSubmit}
          category={category}
          setCategory={handleCategoryChange}
          subcategory={subcategory}
          setSubcategory={handleSubcategoryChange}
        />

        <ProductsTable
          products={products}
          onDelete={handleDeleteRequest}
          onEdit={handleEdit}
          loading={loading}
        />

        <div className="w-full mx-auto flex justify-center items-center gap-4 p-4 border-t border-card-line bg-card rounded-b-2xl">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 rounded-lg border border-line hover:bg-surface-fields disabled:opacity-50 text-ink"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-ink-soft">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 rounded-lg border border-line hover:bg-surface-fields disabled:opacity-50 text-ink"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {deleteTarget && (
          <DeleteConfirmationModal
            title="Delete product?"
            message={`Are you sure you want to delete "${deleteTarget.name}"? This can't be undone.`}
            onCancel={handleDeleteCancel}
            onDelete={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
}

export default Products;
