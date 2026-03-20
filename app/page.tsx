"use client";

import { useEffect, useMemo, useState } from "react";

import { purchases } from "@/data/purchase";
import { filterPurchases, sortPurchases } from "@/helpers/filter";
import {
  capitalize,
  formatCurrency,
  formatDate,
  getStatusClass,
} from "@/helpers/utils";
import type { Filters, SortDirection, SortKey } from "@/types/purchase";

const initialFilters: Filters = {
  search: "",
  city: "",
  category: "",
  status: "",
};

export default function Home() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const cities = [...new Set(purchases.map((purchase) => purchase.city))];
  const categories = [
    ...new Set(purchases.map((purchase) => purchase.category)),
  ];
  const statuses = [...new Set(purchases.map((purchase) => purchase.status))];

  const filteredPurchases = useMemo(() => {
    return filterPurchases(purchases, filters);
  }, [filters]);

  const visiblePurchases = useMemo(() => {
    return sortPurchases(filteredPurchases, sortKey, sortDirection);
  }, [filteredPurchases, sortKey, sortDirection]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setIsLoading(true);

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSort = (key: SortKey) => {
    setIsLoading(true);

    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [filters, sortKey, sortDirection]);

  return (
    <main className="container">
      <h1 className="title">Member Purchase Insights Dashboard</h1>
      <p className="subtitle">Browse member purchase records below.</p>

      <section className="filter-section">
        <div className="filter-grid">
          <div className="filter-item">
            <label htmlFor="search">Search Member Name</label>
            <input
              id="search"
              type="text"
              value={filters.search}
              placeholder="Search by member name"
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label htmlFor="city">City</label>
            <select
              id="city"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {capitalize(status)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className="table-meta">
        <p>{visiblePurchases.length} transactions found</p>
      </div>

      <div className="table-wrapper">
        {isLoading ? (
          <div className="table-skeleton">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="skeleton-row" />
            ))}
          </div>
        ) : (
          <table className="purchase-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Member Name</th>
                <th>City</th>
                <th>Category</th>
                <th>
                  <button
                    type="button"
                    className={`sort-button ${sortKey === "amount" ? "sort-button-active" : ""}`}
                    onClick={() => handleSort("amount")}
                    aria-label={`Sort by amount ${
                      sortKey === "amount" ? sortDirection : "none"
                    }`}
                  >
                    Amount
                    <span className="sort-indicator">
                      {sortKey === "amount"
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </span>
                  </button>
                </th>
                <th>Quantity</th>
                <th>
                  <button
                    type="button"
                    className={`sort-button ${sortKey === "date" ? "sort-button-active" : ""}`}
                    onClick={() => handleSort("date")}
                    aria-label={`Sort by date ${sortKey === "date" ? sortDirection : "none"}`}
                  >
                    Date
                    <span className="sort-indicator">
                      {sortKey === "date"
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </span>
                  </button>
                </th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {visiblePurchases.length > 0 ? (
                visiblePurchases.map((purchase) => (
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
        )}
      </div>
    </main>
  );
}
