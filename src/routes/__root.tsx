import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AuthContextType, useAuth } from 'authentication-service-react-sdk';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

type RouterContext = {
  auth: AuthContextType | undefined;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.navigate({ to: '/' });
  };

  return (
    <div className="relative container mx-auto">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <div className="flex gap-4 p-2">
            <div className="align-center flex flex-grow gap-4">
              <Link to="/" className="[&.active]:font-bold">
                Home
              </Link>
            </div>
            <div className="flex justify-center gap-4">
              {isAuthenticated ? (
                <>
                  <p>
                    Welcome back,{' '}
                    {user?.firstName
                      ? user?.firstName + ' ' + user?.lastName
                      : user?.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer border-none bg-none p-0"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="[&.active]:font-bold">
                    Register
                  </Link>
                  <Link
                    to="/login"
                    search={{ redirect: '/' }}
                    className="[&.active]:font-bold"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          <hr />
          <main>
            <Outlet />
          </main>
        </div>
        <TanStackRouterDevtools />
      </SidebarProvider>
    </div>
  );
}
