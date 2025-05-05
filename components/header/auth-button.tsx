import Link from "next/link";
import UserButton from "../user-button";
import { getUserSession } from "../../app/actions/user/user-data";

export default async function AuthButton() {
  const user = await getUserSession();
  let userEmail: string = "";

  if (user && typeof user.email === "string") userEmail = user.email;

  return !user?.id ? (
    <div>
      <Link href={"/login"} className="btn btn-ghost">
        Login
      </Link>
    </div>
  ) : (
    <UserButton userId={user?.id} userEmail={userEmail} />
  );
}
