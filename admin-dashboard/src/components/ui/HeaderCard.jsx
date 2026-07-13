function HeaderCard({ title1, title2, description }) {
  return (
    <div className="bg-card border border-card-line shadow-lg rounded-3xl p-6 space-y-2">
      <h3 className="text-sm uppercase tracking-[0.35em] text-gold">
        {title1}
      </h3>
      <h2 className="mt-2 text-2xl font-semibold text-ink">{title2}</h2>
      <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
    </div>
  );
}

export default HeaderCard;
