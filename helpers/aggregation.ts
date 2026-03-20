import type { PurchaseRecord } from "@/types/purchase";

export interface PaidAmountByCityItem {
  city: string;
  amount: number;
}

export const getPaidAmountByCity = (
  purchases: PurchaseRecord[],
): PaidAmountByCityItem[] => {
  const paidPurchases = purchases.filter(
    (purchase) => purchase.status === "paid",
  );

  const grouped = paidPurchases.reduce<Record<string, number>>(
    (acc, purchase) => {
      acc[purchase.city] = (acc[purchase.city] || 0) + purchase.amount;
      return acc;
    },
    {},
  );

  return Object.entries(grouped)
    .map(([city, amount]) => ({
      city,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);
};
