import type { SortDirection, SortKey } from "@/types/purchase";

interface SortableHeaderProps {
  label: string;
  sortKeyValue: SortKey;
  activeSortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

export function SortableHeader({
  label,
  sortKeyValue,
  activeSortKey,
  sortDirection,
  onSort,
}: SortableHeaderProps) {
  const isActive = activeSortKey === sortKeyValue;

  return (
    <button
      type="button"
      className={`sort-button ${isActive ? "sort-button-active" : ""}`}
      onClick={() => onSort(sortKeyValue)}
      aria-label={`Sort by ${label.toLowerCase()} ${
        isActive ? sortDirection : "none"
      }`}
    >
      {label}
      <span className="sort-indicator">
        {isActive ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
      </span>
    </button>
  );
}
