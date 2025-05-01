import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/roles')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2">
      <h3>Hello "/settings/roles"!</h3>
    </div>
  );
}
