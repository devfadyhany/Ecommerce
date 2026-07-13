import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";
import api from "../api/axios";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const productSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters"),
  shortDesc: z
    .string()
    .min(10, "Short description must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().positive("Price must be a positive number"),
  ),
  discountPrice: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().nonnegative().optional(),
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().int().nonnegative("Stock must be a non-negative integer"),
  ),
  sku: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().optional(),
  brand: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

const AddProduct = ({ isEditMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEditMode ? true : false);
  const [submitting, setSubmitting] = useState(false);

  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: "electronics",
      isFeatured: false,
      isActive: true,
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      const fetchProductData = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/products/${id}`);
          const product = response.data.product;

          setValue("productName", product.name || "");
          setValue("shortDesc", product.shortDescription || "");
          setValue("description", product.description || "");
          setValue("price", product.price || "");
          setValue("discountPrice", product.discountPrice || "");
          setValue("stock", product.stock || "");
          setValue("sku", product.sku || "");
          setValue("category", product.category || "");
          setValue("subCategory", product.subcategory || "");
          setValue("brand", product.brand || "");
          setValue("isFeatured", product.featured || false);
          setValue("isActive", product.isActive || true);

          setTags(product.tags || []);
          setImages(product.images || []);
          setOriginalImages(product.images || []);
        } catch (error) {
          showErrorToast("Failed to load product data.");
        } finally {
          setLoading(false);
        }
      };
      fetchProductData();
    }
  }, [isEditMode, id, setValue]);

  const handleAddTag = (e) => {
    if (e) e.preventDefault();
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
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

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.productName);
      formData.append("shortDescription", data.shortDesc);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("featured", data.isFeatured);
      formData.append("isActive", data.isActive);
      if (data.brand) formData.append("brand", data.brand);
      if (data.sku) formData.append("sku", data.sku);
      if (data.subCategory) formData.append("subcategory", data.subCategory);
      if (data.discountPrice)
        formData.append("discountPrice", data.discountPrice);

      if (tags.length > 0) {
        tags.forEach((tag) => formData.append("tags", tag));
      }

      if (images.length > 0) {
        images.forEach((img) => {
          if (img.file) {
            formData.append("images", img.file);
          }
        });
      }

      const deletedImages = originalImages.filter(
        (original) =>
          !images.some((img) => img.public_id === original.public_id),
      );

      if (deletedImages.length > 0) {
        formData.append(
          "deletedImages",
          JSON.stringify(deletedImages.map((img) => img.public_id)),
        );
      }

      if (isEditMode) {
        await api.patch(`/products/update/${id}`, formData);
        showSuccessToast("Product updated successfully");
      } else {
        await api.post(`/products`, formData);
        showSuccessToast("Product created successfully");
      }
      navigate("/products");
    } catch (error) {
      console.log(error.response.data);

      showErrorToast("Error saving product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner label="Fetching product data..." />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-surface-soft p-4 md:p-6 text-ink"
    >
      <div className="w-full bg-[image:var(--sef-gradient-gold-deep)] text-on-gold rounded-[2rem] p-6 md:p-8 shadow-xl flex flex-col gap-6 mb-8 border border-gold-dark/40 relative overflow-hidden">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 px-4 py-1.5 bg-black/20 border border-black/10 rounded-full text-xs font-medium text-on-gold hover:bg-black/30 transition-all backdrop-blur-sm"
          >
            <ArrowLeft size={22} />
            Back to products
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-gold/10 border border-gold/30 rounded-2xl text-gold-light shadow-inner flex items-center justify-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
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
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-light">
                  {isEditMode ? "Modify Product" : "Create Product"}
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight text-white font-sans">
                  {isEditMode
                    ? "Update product details seamlessly"
                    : "Launch a polished product entry"}
                </h1>
              </div>
            </div>
            <p className="text-sm text-on-gold/70 max-w-2xl leading-relaxed">
              {isEditMode
                ? "Edit product information, update prices, adjust inventory stock, and manage galleries instantly."
                : "Add products with validation, image previews, multi-upload support, and smooth UX."}
            </p>
          </div>
          <div className="bg-black/20 border border-black/10 backdrop-blur-md rounded-2xl p-4 self-stretch md:self-auto flex flex-col justify-center min-w-[200px]">
            <span className="text-[10px] text-gold-light font-bold tracking-[0.15em] uppercase">
              {isEditMode ? "STATUS" : "READY"}
            </span>
            <span className="text-xs text-on-gold/80 mt-1.5 font-medium">
              {isEditMode
                ? "Editing current entry."
                : "Create, validate, and save with one click."}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card rounded-2xl border border-card-line p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
            <h2 className="text-lg font-bold text-ink mb-2">Gallery</h2>
            <p className="text-xs text-ink-faint mb-6">
              Upload multiple images and preview instantly.
            </p>
            {images.length === 0 ? (
              <div className="w-full aspect-square bg-surface-soft rounded-xl border border-card-line overflow-hidden flex items-center justify-center mb-6 p-4">
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
                    className="relative aspect-square bg-surface-soft border border-card-line rounded-xl overflow-hidden group p-1"
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
            <div className="border-2 border-dashed border-card-line rounded-xl p-8 text-center bg-surface-soft hover:bg-surface-fields transition-all cursor-pointer group">
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
                <div className="p-3 bg-card border border-card-line rounded-xl shadow-sm text-gold mb-4 group-hover:scale-105 transition-transform">
                  <Upload size={22} />
                </div>
                <span className="text-sm font-semibold text-ink">
                  Upload Images
                </span>
                <span className="text-xs text-ink-faint mt-1">
                  Select one or more files (PNG, JPG)
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-card rounded-2xl border border-card-line p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-6">
          <div>
            <label className="block text-sm font-medium text-ink-soft mb-2">
              Product Name
            </label>
            <input
              type="text"
              placeholder="iPhone 16 Pro"
              {...register("productName")}
              className={`w-full px-4 py-3 bg-card border text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all ${errors.productName ? "border-red-500 ring-2 ring-red-500/10" : "border-line"}`}
            />
            {errors.productName && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.productName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-2">
              Short Description
            </label>
            <input
              type="text"
              placeholder="Must be at least 10 characters long"
              {...register("shortDesc")}
              className={`w-full px-4 py-3 bg-card border text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all ${errors.shortDesc ? "border-red-500 ring-2 ring-red-500/10" : "border-line"}`}
            />
            {errors.shortDesc && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.shortDesc.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Minimum 20 characters"
              {...register("description")}
              className={`w-full px-4 py-3 bg-card border text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all resize-none ${errors.description ? "border-red-500 ring-2 ring-red-500/10" : "border-line"}`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-2">
                Price
              </label>
              <input
                type="number"
                placeholder="0.00"
                {...register("price")}
                className={`w-full px-4 py-3 bg-card border text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all ${errors.price ? "border-red-500 ring-2 ring-red-500/10" : "border-line"}`}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-2">
                Discount Price
              </label>
              <input
                type="number"
                placeholder="0.00"
                {...register("discountPrice")}
                className={`w-full px-4 py-3 bg-card border text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all ${errors.discountPrice ? "border-red-500 ring-2 ring-red-500/10" : "border-line"}`}
              />
              {errors.discountPrice && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.discountPrice.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-2">
                Stock
              </label>
              <input
                type="number"
                placeholder="0"
                {...register("stock")}
                className={`w-full px-4 py-3 bg-card border text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all ${errors.stock ? "border-red-500 ring-2 ring-red-500/10" : "border-line"}`}
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.stock.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-2">
                SKU
              </label>
              <input
                type="text"
                placeholder="Product SKU"
                {...register("sku")}
                className="w-full px-4 py-3 bg-card border border-line text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-2">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full px-4 py-3 bg-card border border-line text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all appearance-none cursor-pointer"
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
              <label className="block text-sm font-medium text-ink-soft mb-2">
                Subcategory
              </label>
              <input
                type="text"
                placeholder="e.g. Smartphones"
                {...register("subCategory")}
                className="w-full px-4 py-3 bg-card border border-line text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-2">
                Brand
              </label>
              <input
                type="text"
                placeholder="e.g. Apple"
                {...register("brand")}
                className="w-full px-4 py-3 bg-card border border-line text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-2">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a tag and press +"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag(e)}
                className="flex-1 px-4 py-3 bg-card border border-line text-ink rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="p-3 bg-gold text-on-gold rounded-xl hover:bg-gold-deep shadow-md transition-colors flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 px-3 py-1 bg-surface-fields border border-line text-ink-soft text-xs font-medium rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveTag(idx);
                      }}
                      className="text-ink-faint hover:text-ink p-0.5 rounded-full hover:bg-line transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-ink-soft select-none">
              <input
                type="checkbox"
                {...register("isFeatured")}
                className="w-4 h-4 accent-gold border-line rounded focus:ring-gold/20 cursor-pointer"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-ink-soft select-none">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-4 h-4 accent-gold border-line rounded focus:ring-gold/20 cursor-pointer"
              />
              Active
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-card-line">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-5 py-2.5 bg-surface-fields text-ink-soft text-sm font-medium rounded-xl hover:bg-line transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-gold disabled:opacity-50 text-on-gold text-sm font-semibold rounded-xl hover:bg-gold-deep shadow-lg shadow-gold/10 focus:outline-none focus:ring-4 focus:ring-gold/20 transition-all"
            >
              {submitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-gold border-t-transparent" />
              )}
              {isEditMode ? "Update Product" : "Create Product"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
