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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 safe-area-bottom">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200
                  ${isActive(item.path) ? 'text-gray-900' : 'text-gray-400'}
                `}
              >
                <Icon className="w-6 h-6 mb-1" strokeWidth={isActive(item.path) ? 2.5 : 2} />
                <span className={`text-xs font-medium ${isActive(item.path) ? 'font-bold' : ''}`}>
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
