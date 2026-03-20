import {
  capitalize,
  formatCurrency,
  formatDate,
  getStatusClass,
} from "@/helpers/utils";
import type { PurchaseRecord, SortDirection, SortKey } from "@/types/purchase";

import { SortableHeader } from "./SortableHeader";

interface PurchaseTableProps {
  purchases: PurchaseRecord[];
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

export function PurchaseTable({
  purchases,
  sortKey,
  sortDirection,
  onSort,
}: PurchaseTableProps) {
  return (
    <table className="purchase-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Member Name</th>
          <th>City</th>
          <th>Category</th>
          <th>
            <SortableHeader
              label="Amount"
              sortKeyValue="amount"
              activeSortKey={sortKey}
              sortDirection={sortDirection}
              onSort={onSort}
            />
          </th>
          <th>Quantity</th>
          <th>
            <SortableHeader
              label="Date"
              sortKeyValue="date"
              activeSortKey={sortKey}
              sortDirection={sortDirection}
              onSort={onSort}
            />
          </th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {purchases.length > 0 ? (
          purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.id}</td>
              <td>{purchase.memberName}</td>
              <td>{purchase.city}</td>
              <td>{purchase.category}</td>
              <td>{formatCurrency(purchase.amount)}</td>
              <td>{purchase.quantity}</td>
              <td>{formatDate(purchase.date)}</td>
              <td>
                <span className={getStatusClass(purchase.status)}>
                  {capitalize(purchase.status)}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8} className="empty-state">
              No transactions match the selected filters.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
