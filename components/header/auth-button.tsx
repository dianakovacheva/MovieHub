import Link from "next/link";
import { auth } from "../../auth";
import UserButton from "../user-button";

export default async function AuthButton() {
  const session = await auth();
  const userEmail =
    typeof session?.user?.email === "string" ? session?.user?.email : "";

  return !session?.user?.id ? (
    <div>
      <Link href={"/login"} className="btn btn-ghost">
        Login
      </Link>
    </div>
  ) : (
    <UserButton userEmail={userEmail} />
  );
}
