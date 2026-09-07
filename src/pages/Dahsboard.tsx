import DashboardHeader from '../features/dashboard/components/DahsboardHeader';
import StatGrid from '../features/dashboard/components/StatGrid';

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8 space-y-16">
      <DashboardHeader name="Jean" />
      <StatGrid />
    </main>
  );
}
