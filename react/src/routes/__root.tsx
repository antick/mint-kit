import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import NotFound from '../components/NotFound.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet/>
      <TanStackRouterDevtools/>
    </>
  ),
  notFoundComponent: () => <NotFound />,
});
