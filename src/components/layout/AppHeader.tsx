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
    <header className="shrink-0 border-b bg-white ">
      <div className="flex md:pl-15 h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <NavLink to="/dashboard" className="flex items-center gap-2">
          <div className="bg-slate-50 w-12 rounded-lg">
            <img src={logo} />
          </div>

          <span className="hidden text-lg font-semibold text-gray-900 sm:block">Applytics</span>
        </NavLink>

        {/* Desktop navigation */}
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

        {/* Account */}
        <UserDropdown onDeleteAccount={onDeleteAccount} />
      </div>

      {/* Mobile navigation */}
      <nav className="grid grid-cols-2 border-t px-2 md:hidden">
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
    </header>
  );
}
