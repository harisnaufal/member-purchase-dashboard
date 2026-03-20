import moment from "moment";

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (date: string) => {
  return moment(date).format("DD MMM YYYY");
};

export const getStatusClass = (status: string) => {
  switch (status) {
    case "paid":
      return "status-chip status-paid";
    case "pending":
      return "status-chip status-pending";
    case "cancelled":
      return "status-chip status-cancelled";
    case "refunded":
      return "status-chip status-refunded";
    default:
      return "status-chip";
  }
};
