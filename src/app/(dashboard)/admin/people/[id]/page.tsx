import { notFound } from "next/navigation";
import { JourneyTimeline } from "@/components/journeys/journey-timeline";
import { PersonHeader } from "@/components/people/person-header";
import { TaskList } from "@/components/tasks/task-list";
import { StatusForm } from "@/components/admin/status-form";
import { GroupAssignmentForm } from "@/components/admin/group-assignment-form";
import { NoteForm } from "@/components/admin/note-form";
import { getGroups, getPersonJourney } from "@/lib/data";

export default async function PersonDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ journey, tasks, notes }, groups] = await Promise.all([
    getPersonJourney(id),
    getGroups()
  ]);

  if (!journey || !journey.people) {
    notFound();
  }

  const person = journey.people;
  const assignments = Array.isArray(journey.groups) ? journey.groups : [];

  return (
    <main className="container stack">
      <PersonHeader
        name={`${person.first_name} ${person.last_name}`}
        nextFollowUp={journey.next_follow_up_at}
        status={journey.status}
        type={journey.type}
      />
      <section className="grid cols-2">
        <JourneyTimeline notes={notes} />
        <div className="stack">
          <div className="card stack">
            <h2 style={{ margin: 0 }}>Update status</h2>
            <StatusForm
              currentStatus={journey.status}
              journeyId={journey.id}
              returnPath={`/admin/people/${journey.id}`}
              type={journey.type}
            />
          </div>
          <div className="card stack">
            <h2 style={{ margin: 0 }}>Add note</h2>
            <NoteForm
              journeyId={journey.id}
              returnPath={`/admin/people/${journey.id}`}
            />
          </div>
          <div className="card stack">
            <h2 style={{ margin: 0 }}>Group assignment</h2>
            {assignments.length > 0 ? (
              <div className="stack">
                {assignments.map((assignment: any) => (
                  <div className="pill" key={`${assignment.group_id}-${assignment.assignment_type}`}>
                    {assignment.groups?.name ?? "Assigned group"} ({assignment.assignment_type})
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted">No group assignment recorded yet.</p>
            )}
            <GroupAssignmentForm
              groups={groups}
              journeyId={journey.id}
              journeyType={journey.type}
              returnPath={`/admin/people/${journey.id}`}
            />
          </div>
          <TaskList
            returnPath={`/admin/people/${journey.id}`}
            tasks={tasks}
            title="Open follow-up"
          />
        </div>
      </section>
    </main>
  );
}
