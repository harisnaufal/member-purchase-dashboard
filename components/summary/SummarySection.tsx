import type { PurchaseSummary } from "@/helpers/summary";
import { formatCurrency } from "@/helpers/utils";

interface SummarySectionProps {
  summary: PurchaseSummary;
}

export function SummarySection({ summary }: SummarySectionProps) {
  return (
    <section className="summary-section">
      <div className="section-heading">
        <h2 className="section-title">Summary Insights</h2>
        <p className="section-subtitle">
          Calculated from the currently visible transactions.
        </p>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <p className="summary-label">Visible Transactions</p>
          <h3 className="summary-value">{summary.totalVisibleTransactions}</h3>
        </div>

        <div className="summary-card">
          <p className="summary-label">Paid Amount</p>
          <h3 className="summary-value">
            {formatCurrency(summary.totalPaidAmount)}
          </h3>
        </div>

        <div className="summary-card">
          <p className="summary-label">Paid Quantity</p>
          <h3 className="summary-value">{summary.totalPaidQuantity}</h3>
        </div>

        <div className="summary-card">
          <p className="summary-label">Top Category by Paid Amount</p>
          <h3 className="summary-value">{summary.topCategoryByPaidAmount}</h3>
        </div>
      </div>
    </section>
  );
}
