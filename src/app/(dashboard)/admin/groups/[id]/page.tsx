import { GroupSummaryCard } from "@/components/groups/group-summary-card";
import { getGroups } from "@/lib/data";

export default async function GroupDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const groups = await getGroups();
  const group = groups.find((item) => item.id === id) ?? groups[0];

  return (
    <main className="container stack">
      {group ? (
        <GroupSummaryCard detailed group={group} />
      ) : (
        <div className="card">
          <h1 className="section-title" style={{ fontSize: 36 }}>
            Group not found
          </h1>
          <p className="muted">This group record does not exist yet.</p>
        </div>
      )}
    </main>
  );
}
