export type DashboardHeaderProps = {
  name: string;
};

export default function DashboardHeader({ name = 'Jean' }: DashboardHeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col text-gray-600">
        <p>Welcome {name},</p>
        <h1 className="font-semibold text-4xl text-black">Dashboard</h1>
        <p>Here’s an overview of your internship search.</p>
      </div>
    </header>
  );
}
