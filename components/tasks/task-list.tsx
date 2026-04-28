import type { TaskRecord } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { completeTask } from "@/app/(dashboard)/admin/actions";

export function TaskList({
  title,
  tasks,
  returnPath,
  overdueOnly = false
}: {
  title: string;
  tasks: TaskRecord[];
  returnPath: string;
  overdueOnly?: boolean;
}) {
  const visibleTasks = overdueOnly
    ? tasks.filter((task) => task.due_at && new Date(task.due_at) < new Date())
    : tasks;

  return (
    <section className="card stack">
      <h2 style={{ margin: 0 }}>{title}</h2>
      {visibleTasks.length === 0 ? (
        <p className="muted">Nothing here right now.</p>
      ) : null}
      {visibleTasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 12
          }}
        >
          <div className="stack" style={{ gap: 6 }}>
            <span>{task.title}</span>
            {task.people ? (
              <span className="muted">
                {task.people.first_name} {task.people.last_name}
              </span>
            ) : null}
          </div>
          <div className="stack" style={{ gap: 6, justifyItems: "end" }}>
            <span style={{ color: "var(--muted)" }}>
              {task.due_at
                ? new Date(task.due_at).toLocaleDateString()
                : "No due date"}
            </span>
            {task.due_at && new Date(task.due_at) < new Date() ? (
              <StatusBadge overdue status="overdue" />
            ) : null}
            <form action={completeTask}>
              <input name="taskId" type="hidden" value={task.id} />
              <input name="returnPath" type="hidden" value={returnPath} />
              <button className="button ghost" type="submit">
                Mark done
              </button>
            </form>
          </div>
        </div>
      ))}
    </section>
  );
}
