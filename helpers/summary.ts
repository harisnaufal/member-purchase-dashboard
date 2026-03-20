import type { PurchaseRecord } from "@/types/purchase";

export interface PurchaseSummary {
  totalVisibleTransactions: number;
  totalPaidAmount: number;
  totalPaidQuantity: number;
  topCategoryByPaidAmount: string;
}

export const getPurchaseSummary = (
  purchases: PurchaseRecord[],
): PurchaseSummary => {
  const paidPurchases = purchases.filter(
    (purchase) => purchase.status === "paid",
  );

  const totalVisibleTransactions = purchases.length;

  const totalPaidAmount = paidPurchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0,
  );

  const totalPaidQuantity = paidPurchases.reduce(
    (sum, purchase) => sum + purchase.quantity,
    0,
  );

  const paidAmountByCategory = paidPurchases.reduce<Record<string, number>>(
    (acc, purchase) => {
      acc[purchase.category] = (acc[purchase.category] || 0) + purchase.amount;
      return acc;
    },
    {},
  );

  const topCategoryByPaidAmount =
    Object.entries(paidAmountByCategory).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "-";

  return {
    totalVisibleTransactions,
    totalPaidAmount,
    totalPaidQuantity,
    topCategoryByPaidAmount,
  };
};
