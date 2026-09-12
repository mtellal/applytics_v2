import ApplyticsLogo from '@/assets/Applytics_logo.png';
import useAuth from '@/features/auth/hooks/useAuth';
import { BriefcaseBusiness, CircleUserRound, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const nagigationItems = [
  {
    label: 'Dahsboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Applications',
    path: '/applications',
    icon: BriefcaseBusiness,
  },
];

export default function Sidebar() {
  const { signOut } = useAuth();

  return (
    <aside className="flex-1 flex flex-col gap-8 p-4 border-r border-width-1 border-gray-100 bg-white">
      <header className="flex flex-row justify-center gap-2">
        <div className="bg-slate-50 w-12 rounded-lg">
          <img src={ApplyticsLogo} />
        </div>

        <span className="text-xl self-center font-bold">Applytics</span>
      </header>

      <nav>
        <ul className="space-y-1">
          {nagigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-lg p-3 text-sm font-medium transitions-colors',
                      isActive ? 'bg-blue-50 text-blue-900' : 'bg-transparent text-gray-600',
                    ].join(' ')
                  }
                >
                  <Icon className="w-6" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mx-3 my-2 border-t border-gray-200" />

      <nav>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg p-3 text-sm font-medium transitions-colors',
                  isActive ? 'bg-blue-50 text-blue-900' : 'bg-transparent text-gray-600',
                ].join(' ')
              }
            >
              <CircleUserRound className="w-6" />
              <span>Account</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={signOut}
              className="flex w-full items-center gap-3 p-3 text-slate-600 text-sm font-medium transitions-colors hover:bg-gray-50 hover:text-slate-900"
            >
              <LogOut className="w-6" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
