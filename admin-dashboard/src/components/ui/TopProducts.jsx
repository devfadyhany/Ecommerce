function TopProducts({ products = [] }) {
  return (
    <div className="bg-card rounded-2xl shadow-sm p-4 sm:p-5 lg:p-6 w-full">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-gold">
          Top Products
        </p>

        <h2 className="mt-2 text-xl font-medium text-ink">Best Sellers</h2>
      </div>

      <div className="mt-6 space-y-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex flex-col sm:flex-row sm:items-center gap-4 border border-card-line rounded-xl p-3 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 sm:w-14 sm:h-14 rounded-xl object-cover self-center sm:self-start"
            />

            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h3 className="font-medium text-sm break-words text-ink">
                  {product.name}
                </h3>

                <span className="font-semibold text-emerald-600 text-sm sm:text-base">
                  ${product.revenue}
                </span>
              </div>

              <p className="text-sm text-ink-soft mt-1">
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
