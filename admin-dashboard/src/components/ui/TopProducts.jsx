function TopProducts() {
  const topProducts = [
    {
      name: "iPhone 15 Pro Max",
      image:
        "https://res.cloudinary.com/dvaos6oyh/image/upload/v1779896262/ecommerce-products/hrnrqwugvglo75bzpbef.jpg",
      totalSold: 6,
      revenue: 7200,
    },
    {
      name: "LG Smart TV",
      image:
        "https://res.cloudinary.com/dvaos6oyh/image/upload/v1782282451/ecommerce-products/d5qb1jsg2zedprj5gaua.jpg",
      totalSold: 4,
      revenue: 39200,
    },
    {
      name: "Levi's Mens Men's Grey",
      image:
        "https://res.cloudinary.com/dvaos6oyh/image/upload/v1782333439/ecommerce-products/uufcdauxiwcqgdprwaxg.jpg",
      totalSold: 4,
      revenue: 17860,
    },
    {
      name: "iPad Air (M2 Chip, 11-inch)",
      image:
        "https://res.cloudinary.com/dvaos6oyh/image/upload/v1780229715/ecommerce-products/jlgqbrawdb47matlnjj4.webp",
      totalSold: 4,
      revenue: 2396,
    },
    {
      name: "Xiaomi Redmi 15C",
      image:
        "https://res.cloudinary.com/dvaos6oyh/image/upload/v1780230067/ecommerce-products/pj16g07dam3be5j3jgel.jpg",
      totalSold: 4,
      revenue: 33196,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 lg:p-6 w-full">
      <div>
        <p className="text-xs uppercase text-gray-400 tracking-wider">
          Top Products
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mt-1">
          Best Sellers
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {topProducts.map((product) => (
          <div
            key={product.name}
            className="flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-200 rounded-xl p-3 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 sm:w-14 sm:h-14 rounded-xl object-cover self-center sm:self-start"
            />

            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h3 className="font-medium text-sm break-words">
                  {product.name}
                </h3>

                <span className="font-semibold text-green-600 text-sm sm:text-base">
                  ${product.revenue}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {product.totalSold} units sold
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopProducts;