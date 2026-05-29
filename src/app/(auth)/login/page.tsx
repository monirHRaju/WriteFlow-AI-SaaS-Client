import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" description="Sign in to access your WriteFlow workspace.">
      <LoginForm />
    </AuthLayout>
  );
}
