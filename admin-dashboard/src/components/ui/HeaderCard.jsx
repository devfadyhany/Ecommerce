function HeaderCard({ title1, title2, description }) {
  return (
    <div className="card shadow-lg rounded-3xl space-y-2">
      <h3 className="text-sm uppercase tracking-[0.35em] text-cyan-500">
        {title1}
      </h3>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title2}</h2>
      <p className="desc">{description}</p>
    </div>
  );
}

export default HeaderCard;
