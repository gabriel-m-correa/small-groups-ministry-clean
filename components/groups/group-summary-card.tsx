import type { GroupRecord } from "@/lib/types";

export function GroupSummaryCard({
  group,
  detailed = false
}: {
  group: GroupRecord;
  detailed?: boolean;
}) {
  return (
    <section className="card stack">
      <span className="pill">Group</span>
      <h1 style={{ margin: 0 }}>{group.name}</h1>
      <p style={{ margin: 0, color: "var(--muted)" }}>
        Led by {group.leader_name} | {group.meeting_day ?? "TBD"}
        {group.meeting_time ? ` at ${group.meeting_time}` : ""} |{" "}
        {group.campus ?? "Campus TBD"}
      </p>
      {detailed ? (
        <div className="grid cols-2">
          <div className="card">
            Capacity: {group.current_size}/{group.capacity}
          </div>
          <div className="card">
            Accepting new members: {group.accepting_members ? "Yes" : "No"}
          </div>
          <div className="card">
            Accepting shadow leaders:{" "}
            {group.accepting_shadow_leaders ? "Yes" : "No"}
          </div>
          <div className="card">Status: {group.status}</div>
        </div>
      ) : null}
    </section>
  );
}
