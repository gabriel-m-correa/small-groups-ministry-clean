import { addJourneyNote } from "@/app/(dashboard)/admin/actions";

export function NoteForm({
  journeyId,
  returnPath
}: {
  journeyId: string;
  returnPath: string;
}) {
  return (
    <form action={addJourneyNote} className="stack">
      <input name="journeyId" type="hidden" value={journeyId} />
      <input name="returnPath" type="hidden" value={returnPath} />
      <label className="stack" style={{ gap: 8 }}>
        <span style={{ fontWeight: 600 }}>Add note</span>
        <textarea
          name="body"
          placeholder="Capture a conversation, pastoral context, or next-step detail."
          required
          rows={4}
        />
      </label>
      <button className="button" type="submit">
        Save note
      </button>
    </form>
  );
}
