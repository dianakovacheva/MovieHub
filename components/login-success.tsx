"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAlert } from "../app/utils/use-alert";

export default function LoginSuccess() {
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const { showAlert } = useAlert();

  useEffect(() => {
    if (status === "authenticated" && email) {
      const alertShown = sessionStorage.getItem("alertShown") || "";

      if (!alertShown) {
        sessionStorage.setItem("alertShown", "true");
        showAlert("alert-success", `Welcome, ${email}!`);
      }
    }
  }, [status, email, showAlert]);

  return null;
}
