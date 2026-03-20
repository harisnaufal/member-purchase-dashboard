export function AggregationSkeleton() {
  return (
    <section className="aggregation-section">
      <div className="section-heading">
        <div className="skeleton-block skeleton-heading-title" />
        <div className="skeleton-block skeleton-heading-subtitle" />
      </div>

      <div className="aggregation-card">
        <div className="aggregation-list">
          {Array.from({ length: 1 }).map((_, index) => (
            <div
              key={index}
              className="aggregation-row aggregation-skeleton-row"
            >
              <div className="skeleton-block skeleton-aggregation-label" />
              <div className="skeleton-block skeleton-aggregation-value" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
