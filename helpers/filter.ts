import type {
  Filters,
  PurchaseRecord,
  SortDirection,
  SortKey,
} from "@/types/purchase";

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

export const sortPurchases = (
  purchases: PurchaseRecord[],
  sortKey: SortKey,
  sortDirection: SortDirection,
) => {
  const sortedPurchases = [...purchases];

  sortedPurchases.sort((a, b) => {
    let comparison = 0;

    if (sortKey === "amount") {
      comparison = a.amount - b.amount;

      if (comparison === 0) {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    }

    if (sortKey === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();

      if (comparison === 0) {
        comparison = a.amount - b.amount;
      }
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return sortedPurchases;
};
