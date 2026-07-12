import ProductsHeader from '../components/ui/ProductsHeader'
import ProductStats from '../components/ui/ProductStats'
import api from '../api/axios';
import {useState, useEffect} from 'react';
function Products() {
  const [products, setProducts] = useState([])
      const [totalProducts, setTotalProducts] = useState(0)
      useEffect(() => {
          const fetchProducts = async () => {
              const response = await api.get("/products/search")
              const data = response.data
              setProducts(data.products)
              setTotalProducts(data.totalProducts)
          }
          fetchProducts()
      }, [])
  return (
    <div>
    <div className="p-8 ">
      <ProductsHeader />
    </div>
    <div className="p-8">
      <ProductStats products = {products} totalProducts = {totalProducts}/>
    </div>
    </div>
  );
}

export default Products;