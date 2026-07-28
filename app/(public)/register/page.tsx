import { Metadata } from "next";
import { RegisterForm } from "../../../components/auth/register/register-form";
import { SubmitButton } from "../../../components/auth/submit-button";
import AuthPanel from "../../../components/auth/auth-panel";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <AuthPanel
      title="Create account"
      subtitle="Create your MovieHub account with email and password."
      alternateHref="/login"
      alternateLabel="Sign in to MovieHub"
      alternatePrompt="Already have an account?"
      alternateCta="Sign in"
    >
      <RegisterForm>
        <SubmitButton>Create an account</SubmitButton>
      </RegisterForm>
    </AuthPanel>
  );
}
