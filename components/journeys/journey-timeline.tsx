export function JourneyTimeline({
  notes
}: {
  notes: Array<{ id: string; body: string; created_at?: string }>;
}) {
  return (
    <section className="card stack">
      <h2 style={{ margin: 0 }}>Journey timeline</h2>
      {notes.length === 0 ? (
        <p className="muted">No notes yet. Add one after the first follow-up.</p>
      ) : null}
      {notes.map((note) => (
        <div key={note.id} style={{ paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
          <div>{note.body}</div>
          {note.created_at ? (
            <div className="muted" style={{ marginTop: 6 }}>
              {new Date(note.created_at).toLocaleString()}
            </div>
          ) : null}
        </div>
      ))}
    </section>
  );
}
