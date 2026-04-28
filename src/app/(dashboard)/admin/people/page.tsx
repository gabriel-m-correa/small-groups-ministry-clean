import { PeopleTable } from "@/components/people/people-table";
import { getPeopleJourneys } from "@/lib/data";

export default async function PeoplePage() {
  const journeys = await getPeopleJourneys();

  return (
    <main className="container stack">
      <div className="stack">
        <span className="pill">People</span>
        <h1 className="section-title" style={{ fontSize: 42 }}>
          Everyone in the process
        </h1>
      </div>
      <PeopleTable journeys={journeys} />
    </main>
  );
}
