import { LeadershipPipeline } from "@/components/journeys/leadership-pipeline";
import { getLeaderJourneys } from "@/lib/data";

export default async function LeadersPage() {
  const journeys = await getLeaderJourneys();

  return (
    <main className="container stack">
      <div className="stack">
        <span className="pill">Leadership Pipeline</span>
        <h1 className="section-title" style={{ fontSize: 42 }}>
          Future leaders and next steps
        </h1>
      </div>
      <LeadershipPipeline journeys={journeys} />
    </main>
  );
}
