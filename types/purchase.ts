export type PurchaseStatus = "paid" | "pending" | "cancelled" | "refunded";

export interface PurchaseRecord {
  id: string;
  memberId: string;
  memberName: string;
  city: string;
  category: string;
  amount: number;
  quantity: number;
  date: string;
  status: PurchaseStatus;
}

export type SortKey = "amount" | "date";
export type SortDirection = "asc" | "desc";

export interface Filters {
  search: string;
  city: string;
  category: string;
  status: string;
}
