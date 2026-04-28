import { DashboardSummary } from "@/components/dashboard/dashboard-summary";
import { TaskList } from "@/components/tasks/task-list";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { getDashboardData, getOpenTasks } from "@/lib/data";

export default async function AdminDashboardPage() {
  const [stats, tasks] = await Promise.all([
    getDashboardData(),
    getOpenTasks()
  ]);

  return (
    <main className="container stack">
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}
      >
        <div className="stack">
          <span className="pill">Admin Dashboard</span>
          <h1 className="section-title" style={{ fontSize: 42 }}>
            Care and follow-up
          </h1>
          <p className="muted">
            See new interest, overdue reminders, and the people who need a next
            step.
          </p>
        </div>
        <SignOutButton />
      </div>
      <DashboardSummary stats={stats} />
      <section className="grid cols-2">
        <TaskList returnPath="/admin" tasks={tasks} title="Needs follow-up" />
        <TaskList
          overdueOnly
          returnPath="/admin"
          tasks={tasks}
          title="Overdue tasks"
        />
      </section>
    </main>
  );
}
