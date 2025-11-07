import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Sparkles, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: 'feed', label: 'Feed', path: '/discover', icon: Home },
  { id: 'create', label: 'Create', path: '/tools', icon: Sparkles },
  { id: 'profile', label: 'Profile', path: '/profile', icon: User },
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
                    ? 'bg-gradient-to-br from-primary-50 to-accent-50 scale-110 shadow-soft'
                    : 'group-hover:bg-gray-50 group-hover:scale-105'
                }`}>
                  <Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
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
