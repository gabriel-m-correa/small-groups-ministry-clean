import Link from "next/link";
import { formatJourneyType, type JourneyRecord } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

export function PeopleTable({ journeys }: { journeys: JourneyRecord[] }) {
  return (
    <div className="card">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Name</th>
            <th>Journey</th>
            <th>Status</th>
            <th>Follow-up</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((journey) => (
            <tr key={journey.id}>
              <td style={{ padding: "12px 0" }}>
                <Link href={`/admin/people/${journey.id}`}>
                  {journey.people?.first_name} {journey.people?.last_name}
                </Link>
              </td>
              <td>{formatJourneyType(journey.type)}</td>
              <td>
                <StatusBadge status={journey.status} />
              </td>
              <td>
                {journey.next_follow_up_at
                  ? new Date(journey.next_follow_up_at).toLocaleDateString()
                  : "No reminder set"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
