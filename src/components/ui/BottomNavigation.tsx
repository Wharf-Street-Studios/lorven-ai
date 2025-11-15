import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home01Icon, SparklesIcon, UserIcon } from 'hugeicons-react';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', path: '/discover', icon: Home01Icon },
  { id: 'create', label: 'Create', path: '/tools', icon: SparklesIcon },
  { id: 'profile', label: 'Profile', path: '/profile', icon: UserIcon },
];

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-dark-100 safe-area-bottom z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center flex-1 h-full group gap-1"
              >
                <Icon
                  size={26}
                  color={active ? '#ffffff' : '#737373'}
                />
                <span className={`text-xs ${active ? 'text-white font-semibold' : 'text-dark-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
