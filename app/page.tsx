"use client";

import { useEffect, useMemo, useState } from "react";

import { AggregationSection } from "@/components/aggregation/AggregationSection";
import { FilterSection } from "@/components/filter/FilterSection";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { AggregationSkeleton } from "@/components/skeleton/AggregationSkeleton";
import { SummarySkeleton } from "@/components/skeleton/SummarySkeleton";
import { SummarySection } from "@/components/summary/SummarySection";
import { PurchaseTable } from "@/components/table/PurchaseTable";
import { purchases } from "@/data/purchase";
import { getPaidAmountByCity } from "@/helpers/aggregation";
import { filterPurchases, sortPurchases } from "@/helpers/filter";
import { getPurchaseSummary } from "@/helpers/summary";
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

  const summary = useMemo(() => {
    return getPurchaseSummary(visiblePurchases);
  }, [visiblePurchases]);

  const aggregation = useMemo(() => {
    return getPaidAmountByCity(visiblePurchases);
  }, [visiblePurchases]);

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

      {isLoading ? <SummarySkeleton /> : <SummarySection summary={summary} />}

      {isLoading ? (
        <AggregationSkeleton />
      ) : (
        <AggregationSection items={aggregation} />
      )}

      <div className="section-heading records-heading">
        <h2 className="section-title">Purchase Records</h2>
        <p className="section-subtitle">
          Use filters to narrow down the visible transactions.
        </p>
      </div>

      <FilterSection
        filters={filters}
        cities={cities}
        categories={categories}
        statuses={statuses}
        onFilterChange={handleFilterChange}
      />

      <div className="table-meta">
        <p>{visiblePurchases.length} transactions found</p>
      </div>

      <div className="table-wrapper">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <PurchaseTable
            purchases={visiblePurchases}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        )}
      </div>
    </main>
  );
}
