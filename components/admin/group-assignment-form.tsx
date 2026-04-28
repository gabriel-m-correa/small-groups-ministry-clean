import { assignGroup } from "@/app/(dashboard)/admin/actions";
import type { GroupRecord, JourneyType } from "@/lib/types";

export function GroupAssignmentForm({
  journeyId,
  journeyType,
  groups,
  returnPath
}: {
  journeyId: string;
  journeyType: JourneyType;
  groups: GroupRecord[];
  returnPath: string;
}) {
  const assignmentType =
    journeyType === "join_group" ? "member" : "shadow_leader";

  const filteredGroups = groups.filter((group) =>
    assignmentType === "member"
      ? group.accepting_members
      : group.accepting_shadow_leaders
  );

  return (
    <form action={assignGroup} className="stack">
      <input name="journeyId" type="hidden" value={journeyId} />
      <input name="returnPath" type="hidden" value={returnPath} />
      <input name="assignmentType" type="hidden" value={assignmentType} />
      <label className="stack" style={{ gap: 8 }}>
        <span style={{ fontWeight: 600 }}>
          {assignmentType === "member"
            ? "Assign to existing group"
            : "Assign to shadow a leader"}
        </span>
        <select defaultValue="" name="groupId" required>
          <option disabled value="">
            Select a group
          </option>
          {filteredGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name} - {group.leader_name}
            </option>
          ))}
        </select>
      </label>
      <button className="button" type="submit">
        Save assignment
      </button>
    </form>
  );
}
