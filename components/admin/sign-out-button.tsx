import { signOutAdmin } from "@/app/(dashboard)/admin/actions";

export function SignOutButton() {
  return (
    <form action={signOutAdmin}>
      <button className="button ghost" type="submit">
        Sign out
      </button>
    </form>
  );
}
