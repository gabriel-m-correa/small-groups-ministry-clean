import Link from "next/link";
import { formatJourneyStatus, type JourneyRecord } from "@/lib/types";

export function LeadershipPipeline({
  journeys
}: {
  journeys: JourneyRecord[];
}) {
  const columns = journeys.reduce<Record<string, JourneyRecord[]>>((acc, journey) => {
    const key = formatJourneyStatus(journey.status);
    acc[key] ??= [];
    acc[key].push(journey);
    return acc;
  }, {});

  return (
    <section className="grid cols-2">
      {Object.entries(columns).map(([name, items]) => (
        <article className="card stack" key={name}>
          <h2 style={{ margin: 0 }}>{name}</h2>
          {items.map((item) => (
            <Link key={item.id} href={`/admin/people/${item.id}`} className="pill">
              {item.people?.first_name} {item.people?.last_name}
            </Link>
          ))}
        </article>
      ))}
    </section>
  );
}
