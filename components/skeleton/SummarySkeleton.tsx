export function SummarySkeleton() {
  return (
    <section className="summary-section">
      <div className="section-heading">
        <div className="skeleton-block skeleton-heading-title" />
        <div className="skeleton-block skeleton-heading-subtitle" />
      </div>

      <div className="summary-grid">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="summary-card summary-skeleton-card">
            <div className="skeleton-block skeleton-summary-label" />
            <div className="skeleton-block skeleton-summary-value" />
          </div>
        ))}
      </div>
    </section>
  );
}
