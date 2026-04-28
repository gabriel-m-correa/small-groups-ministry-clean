import Link from "next/link";
import type { GroupRecord } from "@/lib/types";

export function GroupsTable({ groups }: { groups: GroupRecord[] }) {
  return (
    <div className="card">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Group</th>
            <th>Leader</th>
            <th>Schedule</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group: GroupRecord) => (
            <tr key={group.name}>
              <td style={{ padding: "12px 0" }}>
                <Link href={`/admin/groups/${group.id}`}>{group.name}</Link>
              </td>
              <td>{group.leader_name}</td>
              <td>
                {group.meeting_day ?? "TBD"}
                {group.meeting_time ? ` • ${group.meeting_time}` : ""}
              </td>
              <td>
                {group.current_size}/{group.capacity}
              </td>
              <td>{group.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
