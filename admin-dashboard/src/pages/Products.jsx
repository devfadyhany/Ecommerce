import ProductsHeader from '../components/ui/ProductsHeader'
import ProductStats from '../components/ui/ProductStats'
function Products() {
  return (
    <div>
    <div className="p-8 ">
      <ProductsHeader />
    </div>
    <div className="p-8">
      <ProductStats />
    </div>
    </div>
  );
}

export default Products;