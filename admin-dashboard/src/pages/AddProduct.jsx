import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Plus, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

const AddProduct = ({ isEditMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEditMode ? true : false);
  const [submitting, setSubmitting] = useState(false);

  const [productName, setProductName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("electronics");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchProductData = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/products/${id}`);
          const product = response.data.data || response.data;

          setProductName(product.name || product.title || "");
          setShortDesc(product.shortDescription || product.shortDesc || "");
          setDescription(product.description || "");
          setPrice(product.price || "");
          setDiscountPrice(
            product.priceAfterDiscount || product.discountPrice || "",
          );
          setStock(product.quantity || product.stock || "");
          setSku(product.sku || "");
          setCategory(product.category || "electronics");
          setSubCategory(product.subcategory || "");
          setBrand(product.brand || "");
          setTags(product.tags || []);
          setIsFeatured(product.isFeatured || false);
          setIsActive(product.isActive || true);
          setImages(product.images || []);
        } catch (error) {
          console.error("Error fetching product details:", error);
          toast.error("Failed to load product data.");
        } finally {
          setLoading(false);
        }
      };
      fetchProductData();
    }
  }, [isEditMode, id]);

  const handleAddTag = (e) => {
    if (e) e.preventDefault();
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      public_id: "local_preview_id",
      file: file,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("shortDescription", shortDesc);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("stock", Number(stock));
      formData.append("category", category);
      if (brand) formData.append("brand", brand);

      if (images.length > 0) {
        images.forEach((img) => {
          if (img.file) {
            formData.append("images", img.file);
          }
        });

        const existingImages = images.filter((img) => !img.file);
        if (existingImages.length > 0) {
          formData.append("existingImages", JSON.stringify(existingImages));
        }
      }

      if (isEditMode) {
        await api.put(`/products/${id}`, formData);
        toast.success("Product updated successfully! ");
      } else {
        await api.post(`/products`, formData);
        toast.success("Product created successfully! ");
      }
      navigate("/products");
    } catch (error) {
      console.error("Error saving product:", error);
      const backendErrors = error.response?.data?.errors;
      const errorMessage = backendErrors
        ? backendErrors.join("\n")
        : error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[#0ea5e9] animate-spin" />
          <p className="text-slate-500 text-sm font-medium">
            Fetching product data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-[#f8fafc] p-4 md:p-6 text-[#334155]"
    >
      <div className="w-full bg-[#030712] bg-gradient-to-r from-[#030712] via-[#0b1528] to-[#0f172a] text-white rounded-[2rem] p-6 md:p-8 shadow-xl flex flex-col gap-6 mb-8 border border-slate-800/50 relative overflow-hidden">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 px-4 py-1.5 bg-slate-900/40 border border-slate-800 rounded-full text-xs font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white transition-all backdrop-blur-sm"
          >
            <ArrowLeft size={22} />
            Back to products
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-cyan-950/40 border border-cyan-800/30 rounded-2xl text-cyan-400 shadow-inner flex items-center justify-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                h="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-box"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                {isEditMode ? "Modify Product" : "Create Product"}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight text-white font-sans">
                {isEditMode
                  ? "Update product details seamlessly"
                  : "Launch a polished product entry"}
              </h1>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                {isEditMode
                  ? "Edit product information, update prices, adjust inventory stock, and manage galleries instantly."
                  : "Add products with validation, image previews, multi-upload support, and smooth UX."}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-4 self-stretch md:self-auto flex flex-col justify-center min-w-[200px]">
            <span className="text-[10px] text-cyan-400 font-bold tracking-[0.15em] uppercase">
              {isEditMode ? "STATUS" : "READY"}
            </span>
            <span className="text-xs text-slate-300 mt-1.5 font-medium">
              {isEditMode
                ? "Editing current entry."
                : "Create, validate, and save with one click."}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Gallery</h2>
            <p className="text-xs text-slate-400 mb-6">
              Upload multiple images and preview instantly.
            </p>
            {images.length === 0 ? (
              <div className="w-full aspect-square bg-[#f8fafc] rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center mb-6 p-4">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
                  alt="Default Preview"
                  className="max-h-full object-contain rounded-lg "
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square bg-[#f8fafc] border border-slate-200 rounded-xl overflow-hidden group p-1"
                  >
                    <img
                      src={img.url}
                      alt={`Preview ${idx}`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-[#f8fafc] hover:bg-slate-50 transition-all cursor-pointer group">
              <input
                type="file"
                className="hidden"
                id="file-upload"
                multiple
                onChange={handleImageUpload}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-cyan-500 mb-4 group-hover:scale-105 transition-transform">
                  <Upload size={22} />
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  Upload Images
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Select one or more files (PNG, JPG)
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              required
              placeholder="iPhone 16 Pro"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Short Description
            </label>
            <input
              type="text"
              placeholder="Must be at least 10 characters long"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Minimum 20 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price
              </label>
              <input
                type="number"
                required
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Discount Price
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                placeholder="Product SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all appearance-none cursor-pointer"
              >
                <option value="electronics">Electronics</option>
                <option value="phones">Phones</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
                <option value="beauty">Beauty</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subcategory
              </label>
              <input
                type="text"
                placeholder="e.g. Smartphones"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                placeholder="e.g. Apple"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a tag and press +"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag(e)}
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 shadow-md transition-colors flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-cyan-500 border-slate-300 rounded focus:ring-cyan-500/20 cursor-pointer"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-cyan-500 border-slate-300 rounded focus:ring-cyan-500/20 cursor-pointer"
              />
              Active
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0ea5e9] disabled:bg-cyan-400 text-white text-sm font-semibold rounded-xl hover:bg-[#0284c7] shadow-lg shadow-cyan-500/10 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEditMode ? "Update Product" : "Create Product"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
