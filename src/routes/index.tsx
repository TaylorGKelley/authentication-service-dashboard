import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from 'authentication-service-react-sdk';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const auth = useAuth();
  return (
    <div>
      <h3 className="text-3xl font-medium">
        {!auth.isAuthenticated
          ? 'Welcome Home!'
          : `Hi, ${auth.user?.firstName ? auth.user?.firstName + ' ' + auth.user?.lastName : auth.user?.email}`}
      </h3>
    </div>
  );
}
