import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home01Icon, SparklesIcon, UserIcon } from 'hugeicons-react';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}

const navItems: NavItem[] = [
  { id: 'feed', label: 'Feed', path: '/discover', icon: Home01Icon },
  { id: 'create', label: 'Create', path: '/tools', icon: SparklesIcon },
  { id: 'profile', label: 'Profile', path: '/profile', icon: UserIcon },
];

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 safe-area-bottom shadow-strong z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-18 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative group
                  ${active ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}
                `}
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100 scale-110 shadow-soft'
                    : 'group-hover:bg-gray-50 group-hover:scale-105'
                }`}>
                  <Icon size={24} strokeWidth={active ? 2.5 : 2} color={active ? '#2563eb' : '#9ca3af'} />
                </div>
                <span className={`text-xs mt-1 font-semibold transition-all duration-300 ${
                  active ? 'opacity-100 scale-100' : 'opacity-70 scale-95 group-hover:opacity-100'
                }`}>
                  {item.label}
                </span>
                {active && (
                  <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
