import { createFileRoute } from '@tanstack/react-router';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';

export const Route = createFileRoute('/forgot-password/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPasswordForm />;
}
