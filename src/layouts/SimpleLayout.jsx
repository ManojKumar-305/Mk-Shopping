import { Outlet } from 'react-router-dom';

export function SimpleLayout() {
  return (
    <main className="simple-layout">
      <Outlet />
    </main>
  );
}
