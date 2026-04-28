export function DashboardSummary({
  stats
}: {
  stats: Array<{ label: string; value: number }>;
}) {
  return (
    <section className="grid cols-2">
      {stats.map((stat) => (
        <article className="card stack" key={stat.label}>
          <span className="pill">{stat.label}</span>
          <strong style={{ fontSize: "2rem" }}>{stat.value}</strong>
        </article>
      ))}
    </section>
  );
}
