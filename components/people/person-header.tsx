import { formatJourneyType } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

export function PersonHeader({
  name,
  type,
  status,
  nextFollowUp
}: {
  name: string;
  type: "join_group" | "leader_interest";
  status: string;
  nextFollowUp: string | null;
}) {
  return (
    <section className="card stack">
      <span className="pill">Person Record</span>
      <h1 className="section-title" style={{ fontSize: 40 }}>
        {name}
      </h1>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <span className="pill">{formatJourneyType(type)}</span>
        <StatusBadge status={status} />
        <span className="muted">
          {nextFollowUp
            ? `Next follow-up ${new Date(nextFollowUp).toLocaleString()}`
            : "No follow-up date set"}
        </span>
      </div>
    </section>
  );
}
