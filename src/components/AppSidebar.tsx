import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, useRouterState } from '@tanstack/react-router';
import {
  LucideFileLock,
  LucideHome,
  LucideServer,
  LucideUser2,
  LucideUserPlus2,
} from 'lucide-react';

type MenuItemType = {
  icon?: React.ReactNode;
  title: string;
  url: string;
};
type DataType = {
  navItems: (Omit<MenuItemType, 'url'> & {
    url?: string;
    items?: MenuItemType[];
  })[];
};
// This is sample data.
const data: DataType = {
  navItems: [
    {
      icon: <LucideHome />,
      title: 'Home',
      url: '/',
    },
    {
      icon: <LucideUser2 />,
      title: 'User Management',
      url: '/users',
    },
    {
      title: 'Settings',
      items: [
        {
          icon: <LucideUserPlus2 />,
          title: 'Roles',
          url: '/settings/roles',
        },
        {
          icon: <LucideFileLock />,
          title: 'Permissions',
          url: '/settings/permissions',
        },
        {
          icon: <LucideServer />,
          title: 'Services',
          url: '/settings/services',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <Sidebar
      collapsible="none"
      className="relative h-screen border-x-[1px] border-r-gray-200"
      {...props}
    >
      <SidebarHeader className="p-2">
        <h1 className="text-center">Auth Dashboard</h1>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {data.navItems.map((item) =>
          !item.items ? (
            <SidebarMenu>
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={currentPath === item.url}>
                  <Link to={item.url} className="h-full w-full">
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ) : (
            <SidebarGroup key={item.title} className="p-0">
              <SidebarGroupLabel>
                <span>{item.title}</span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items?.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={currentPath === item.url}
                      >
                        <Link to={item.url} className="h-full w-full">
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ),
        )}
      </SidebarContent>
    </Sidebar>
  );
}
