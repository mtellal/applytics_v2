import StatCard from '../components/ui/StatCard';

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8 space-y-16">
      <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>

      <div className="flex gap-4">
        <StatCard type="applications" />
        <StatCard type="responses" />
        <StatCard type="interviews" />
        <StatCard type="offers" />
      </div>
    </div>
  );
}
