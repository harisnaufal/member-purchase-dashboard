import type { PaidAmountByCityItem } from "@/helpers/aggregation";
import { formatCurrency } from "@/helpers/utils";

interface PaidAmountByCityProps {
  items: PaidAmountByCityItem[];
}

export function AggregationSection({ items }: PaidAmountByCityProps) {
  return (
    <section className="aggregation-section">
      <div className="section-heading">
        <h2 className="section-title">Paid Amount by City</h2>
        <p className="section-subtitle">
          Grouped from the currently visible paid transactions.
        </p>
      </div>

      <div className="aggregation-card">
        {items.length > 0 ? (
          <div className="aggregation-list">
            {items.map((item) => (
              <div key={item.city} className="aggregation-row">
                <span className="aggregation-label">{item.city}</span>
                <span className="aggregation-value">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="aggregation-empty">
            No paid transactions available for the current filters.
          </div>
        )}
      </div>
    </section>
  );
}
