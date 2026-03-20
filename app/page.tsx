import { purchases } from "@/data/purchase";
import { formatCurrency, formatDate, getStatusClass } from "@/helpers/utils";

export default function Home() {
  return (
    <main className="container">
      <h1 className="title">Member Purchase Insights Dashboard</h1>
      <p className="subtitle">Browse member purchase records below.</p>

      <div className="table-wrapper">
        <table className="purchase-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Member Name</th>
              <th>City</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((purchase) => (
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
                    {purchase.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
