import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      description="Join WriteFlow AI and start collaborating with agentic workflows."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
