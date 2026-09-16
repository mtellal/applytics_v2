import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/layout/Sidebar';

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <main className="flex-6 p-6 min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
