import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AuthContextType } from 'authentication-service-react-sdk';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import TopBar from '@/components/TopBar';

type RouterContext = {
  auth: AuthContextType | undefined;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="relative container mx-auto">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full border-r-[1px] border-r-gray-200">
          <TopBar />
          <main className="overflow-y-auto p-2 md:p-4">
            <Outlet />
          </main>
        </div>
        <TanStackRouterDevtools />
      </SidebarProvider>
    </div>
  );
}
