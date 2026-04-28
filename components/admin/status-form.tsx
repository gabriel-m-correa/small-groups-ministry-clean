import { updateJourneyStatus } from "@/app/(dashboard)/admin/actions";
import {
  formatJourneyStatus,
  leaderStatuses,
  joinStatuses,
  type JourneyType
} from "@/lib/types";

export function StatusForm({
  journeyId,
  type,
  currentStatus,
  returnPath
}: {
  journeyId: string;
  type: JourneyType;
  currentStatus: string;
  returnPath: string;
}) {
  const statuses = type === "join_group" ? joinStatuses : leaderStatuses;

  return (
    <form action={updateJourneyStatus} className="stack">
      <input name="journeyId" type="hidden" value={journeyId} />
      <input name="returnPath" type="hidden" value={returnPath} />
      <label className="stack" style={{ gap: 8 }}>
        <span style={{ fontWeight: 600 }}>Current status</span>
        <select defaultValue={currentStatus} name="status">
          {statuses.map((status) => (
            <option key={status} value={status}>
              {formatJourneyStatus(status)}
            </option>
          ))}
        </select>
      </label>
      <button className="button" type="submit">
        Save status
      </button>
    </form>
  );
}
