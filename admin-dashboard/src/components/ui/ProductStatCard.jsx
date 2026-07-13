function ProductStatCard({ title, value, icon, iconBackground,color}){
    return(
        <div className="flex flex-col rounded-3xl bg-card p-5 shadow-md transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl gap-3">
            <div
          className={`flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br ${iconBackground} ${color || 'text-on-gold'} text-2xl shadow-lg transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6`}
        >
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-ink">{value}</h3>
        <p className="text-sm font-normal text-ink-soft">{title}</p>
        </div>
    )
}
export default ProductStatCard;