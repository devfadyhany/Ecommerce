import ProductStatCard from './ProductStatCard';
import { Package2, Star, TrendingUp, Boxes } from "lucide-react";


function ProductStats({products, totalProducts}) {
    const featuredProducts = products.filter((product) =>(product.featured)).length
    const inStockProducts = products.filter((product) => (product.stock > 0)).length
    const outOfStockProducts = products.filter((product) => (product.stock === 0)).length
    const cards = [
        {
            icon:<Package2/>,
            iconBackground:"from-cyan-100 to-blue-200",
            color:"text-cyan-600",
            value: totalProducts,
            title:"Total"
        },
        {
            icon:<Star/>,
            iconBackground:"from-orange-100 to-amber-200",
            color:"text-orange-500",
            value: featuredProducts,
            title:"Featured"
        },
        {
            icon:<TrendingUp/>,
            iconBackground:"from-teal-100 to-emerald-200",
            color:"text-teal-500",
            value: inStockProducts,
            title:"In Stock"
        },
        {
            icon:<Boxes/>,
            iconBackground:"from-pink-100 to-rose-200",
            color:"text-pink-500",
            value: outOfStockProducts,
            title:"Out of Stock"
        },
    ]

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {
                cards.map((card) => (
                    <ProductStatCard
                        key = {card.title}
                        title = {card.title}
                        value = {card.value}
                        icon = {card.icon}
                        iconBackground = {card.iconBackground}
                        color = {card.color}
                    />
                ))
            }
        </div>
    )
}
export default ProductStats;