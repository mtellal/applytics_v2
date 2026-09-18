import { LayoutDashboard, FileText } from 'lucide-react';
import { NavLink } from 'react-router';
import UserDropdown from './UserDropDown';

import logo from '@/assets/Applytics_logo.png';

type AppHeaderProps = {
  onDeleteAccount: () => void;
};

const navigation = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Applications',
    path: '/applications',
    icon: FileText,
  },
];

export default function AppHeader({ onDeleteAccount }: AppHeaderProps) {
  return (
    <>
      <header className="shrink-0 border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:pl-15">
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <div className="w-12 rounded-lg bg-slate-50">
              <img src={logo} alt="Applytics" />
            </div>

            <span className="hidden text-lg font-semibold text-gray-900 sm:block">Applytics</span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <UserDropdown onDeleteAccount={onDeleteAccount} />
        </div>
      </header>

      <nav className="sticky top-0 z-40 grid shrink-0 grid-cols-2 border-b bg-white px-2 md:hidden">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `relative flex h-12 items-center justify-center gap-2 text-sm font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="size-4" />
                {label}

                {isActive && (
                  <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-blue-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
