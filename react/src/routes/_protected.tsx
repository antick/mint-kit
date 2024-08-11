import { Outlet, createFileRoute } from '@tanstack/react-router';
import TopNavigation from '../components/TopNavigation';
import LeftNavigation from '../components/LeftNavigation';

function AuthLayout() {
  const backgroundColor = 'bg-gray-100 bg-gradient-to-br from-teal-400 via-blue-400 to-emerald-400';

  return (
    <>
      <div className="blob"/>
      <div className={`flex px-4 py-4 xl:px-14 xl:py-12 min-h-screen ${backgroundColor}`}>
        <aside className="flex">
          <LeftNavigation/>
        </aside>

        <section className="flex flex-col w-full z-10">
          <header className="flex w-full">
            <TopNavigation/>
          </header>
          <Outlet/>
        </section>
      </div>
    </>
  );
}

export const Route = createFileRoute('/_protected')({
  component: AuthLayout,
});
