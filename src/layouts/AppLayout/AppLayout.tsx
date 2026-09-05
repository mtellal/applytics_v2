import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/layout/Sidebar';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-6 p-6">
        <Outlet />
      </main>
    </div>
  );
}
