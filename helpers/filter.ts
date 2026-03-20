import type { Filters, PurchaseRecord } from "@/types/purchase";

export const filterPurchases = (
  purchases: PurchaseRecord[],
  filters: Filters,
) => {
  return purchases.filter((purchase) => {
    const matchesSearch = purchase.memberName
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchesCity = !filters.city || purchase.city === filters.city;
    const matchesCategory =
      !filters.category || purchase.category === filters.category;
    const matchesStatus = !filters.status || purchase.status === filters.status;

    return matchesSearch && matchesCity && matchesCategory && matchesStatus;
  });
};
