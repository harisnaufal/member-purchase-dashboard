interface TableSkeletonProps {
  rows?: number;
}

export function TableSkeleton({ rows = 5 }: TableSkeletonProps) {
  return (
    <div className="table-skeleton">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="skeleton-row" />
      ))}
    </div>
  );
}
