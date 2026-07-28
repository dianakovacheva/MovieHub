import { Metadata } from "next";
import { LoginForm } from "../../../components/auth/login/login-form";
import { SubmitButton } from "../../../components/auth/submit-button";
import AuthPanel from "../../../components/auth/auth-panel";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <AuthPanel
      title="Sign in"
      subtitle="Use your email and password to continue."
      alternateHref="/register"
      alternateLabel="Create a MovieHub account"
      alternatePrompt="New to MovieHub?"
      alternateCta="Create an account"
    >
      <LoginForm>
        <SubmitButton>Sign in</SubmitButton>
      </LoginForm>
    </AuthPanel>
  );
}
