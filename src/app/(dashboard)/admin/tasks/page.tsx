import { TaskList } from "@/components/tasks/task-list";
import { getOpenTasks } from "@/lib/data";

export default async function TasksPage() {
  const tasks = await getOpenTasks();

  return (
    <main className="container stack">
      <div className="stack">
        <span className="pill">Tasks</span>
        <h1 className="section-title" style={{ fontSize: 42 }}>
          Follow-up reminders
        </h1>
      </div>
      <TaskList returnPath="/admin/tasks" tasks={tasks} title="All open tasks" />
    </main>
  );
}
