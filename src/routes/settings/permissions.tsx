import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/permissions')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2">
      <h3>Hello "/settings/permissions"!</h3>
    </div>
  );
}
