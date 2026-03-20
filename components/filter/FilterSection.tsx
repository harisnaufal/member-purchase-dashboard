import { capitalize } from "@/helpers/utils";
import type { Filters, PurchaseStatus } from "@/types/purchase";

interface FilterSectionProps {
  filters: Filters;
  cities: string[];
  categories: string[];
  statuses: PurchaseStatus[];
  onFilterChange: (key: keyof Filters, value: string) => void;
}

export function FilterSection({
  filters,
  cities,
  categories,
  statuses,
  onFilterChange,
}: FilterSectionProps) {
  return (
    <section className="filter-section">
      <div className="filter-grid">
        <div className="filter-item">
          <label htmlFor="search">Search Member Name</label>
          <input
            id="search"
            type="text"
            value={filters.search}
            placeholder="Search by member name"
            onChange={(e) => onFilterChange("search", e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="city">City</label>
          <select
            id="city"
            value={filters.city}
            onChange={(e) => onFilterChange("city", e.target.value)}
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
            onChange={(e) => onFilterChange("category", e.target.value)}
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
            onChange={(e) => onFilterChange("status", e.target.value)}
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
  );
}
