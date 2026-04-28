import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/people", label: "People" },
  { href: "/admin/groups", label: "Groups" },
  { href: "/admin/leaders", label: "Leaders" },
  { href: "/admin/tasks", label: "Tasks" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          borderBottom: "1px solid var(--border)",
          background: "rgba(246, 239, 226, 0.9)",
          backdropFilter: "blur(10px)"
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16
          }}
        >
          <Link href="/" style={{ fontWeight: 700 }}>
            Small Groups Ministry
          </Link>
          <nav style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
