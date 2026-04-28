import { formatJourneyStatus } from "@/lib/types";

export function StatusBadge({
  status,
  overdue = false
}: {
  status: string;
  overdue?: boolean;
}) {
  return (
    <span className={`status-badge${overdue ? " overdue" : ""}`}>
      {formatJourneyStatus(status)}
    </span>
  );
}
