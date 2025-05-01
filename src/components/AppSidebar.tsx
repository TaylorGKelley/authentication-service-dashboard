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
      title: 'Home',
      url: '/',
    },
    {
      title: 'User Management',
      url: '/users',
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Roles',
          url: '/settings/roles',
        },
        {
          title: 'Permissions',
          url: '/settings/permissions',
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
      <SidebarHeader>
        <h4>Auth Dashboard</h4>
      </SidebarHeader>
      <SidebarContent>
        {data.navItems.map((item) =>
          !item.items ? (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton isActive={currentPath === item.url}>
                <Link to={item.url} className="h-full w-full">
                  {item.icon}
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>
                <Link to={item.url}>
                  {item.icon}
                  {item.title}
                </Link>
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
                          {item.title}
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
