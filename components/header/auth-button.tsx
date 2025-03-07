import Link from "next/link";
import { auth } from "../../auth";
import UserButton from "../user-button";

export default async function AuthButton() {
  const session = await auth();

  return !session?.user?.id ? (
    <div>
      <Link href={"/login"} className="btn btn-ghost">
        Login
      </Link>
    </div>
  ) : (
    <UserButton userEmail={session.user.email} />
  );
}
