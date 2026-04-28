import { GroupsTable } from "@/components/groups/groups-table";
import { getGroups } from "@/lib/data";

export default async function GroupsPage() {
  const groups = await getGroups();

  return (
    <main className="container stack">
      <div className="stack">
        <span className="pill">Groups</span>
        <h1 className="section-title" style={{ fontSize: 42 }}>
          Active groups and openings
        </h1>
      </div>
      <GroupsTable groups={groups} />
    </main>
  );
}
