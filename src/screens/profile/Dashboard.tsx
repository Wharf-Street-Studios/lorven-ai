import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTokens } from '../../context/TokenContext';
import { Button, BottomNavigation } from '../../components/ui';
import { Coins01Icon, GiftIcon, Notification02Icon, Medal03Icon, UserCircle02Icon, Edit02Icon, ArrowRight01Icon, LockIcon, FileSecurityIcon, CustomerSupportIcon, Logout04Icon, SparklesIcon, FavouriteIcon } from 'hugeicons-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { balance } = useTokens();

  const quickActions = [
    { id: 'wallet', name: 'Wallet', Icon: Coins01Icon, path: '/wallet' },
    { id: 'rewards', name: 'Rewards', Icon: GiftIcon, path: '/rewards' },
    { id: 'notifications', name: 'Notifications', Icon: Notification02Icon, path: '/notifications' },
    { id: 'plans', name: 'Upgrade', Icon: Medal03Icon, path: '/plans' },
  ];

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      signOut();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100">
        <div className="px-4 py-4 max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
        </div>
      </header>

      {/* Account Info */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="bg-dark-100 rounded-3xl p-5">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-dark-150 rounded-full flex items-center justify-center flex-shrink-0">
              <UserCircle02Icon size={40} color="#ffffff" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white truncate">{user?.fullName}</h2>
              <p className="text-dark-500">@{user?.username}</p>
              <p className="text-sm text-dark-600 truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => navigate('/edit-profile')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-150 transition-colors flex-shrink-0"
            >
              <Edit02Icon size={20} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="px-4 pb-6 max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Free Plan</h3>
              <p className="text-sm text-white/80">30 tokens/month</p>
            </div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white">
              FREE
            </span>
          </div>
          <div className="space-y-2 mb-4">
            {['Standard quality', 'Watermarked outputs', '5 downloads/day'].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-white/90">
                <span>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Button
            variant="primary"
            size="medium"
            fullWidth
            onClick={() => navigate('/plans')}
          >
            Upgrade to Creator or Pro
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 pb-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-dark-100 rounded-3xl p-4 text-center">
            <Coins01Icon size={32} color="#3b82f6" className="mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{balance}</p>
            <p className="text-xs text-dark-500">Tokens</p>
          </div>
          <div className="bg-dark-100 rounded-3xl p-4 text-center">
            <SparklesIcon size={32} color="#a855f7" className="mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-xs text-dark-500">Creations</p>
          </div>
          <div className="bg-dark-100 rounded-3xl p-4 text-center">
            <FavouriteIcon size={32} color="#ef4444" className="mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">234</p>
            <p className="text-xs text-dark-500">Likes</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => navigate(action.path)}
              className="bg-dark-100 rounded-3xl p-4 aspect-square flex flex-col items-center justify-center gap-2 hover:bg-dark-150 active:scale-98 transition-all"
            >
              <action.Icon size={28} color="#ffffff" />
              <span className="text-xs font-medium text-white text-center">{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="px-4 pb-6 max-w-2xl mx-auto">
        <div className="bg-dark-100 rounded-3xl overflow-hidden divide-y divide-dark-150">
          <button className="w-full text-left px-5 py-4 hover:bg-dark-150 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LockIcon size={20} color="#ffffff" />
              <span className="font-medium text-white">Privacy Settings</span>
            </div>
            <ArrowRight01Icon size={20} color="#737373" />
          </button>
          <button className="w-full text-left px-5 py-4 hover:bg-dark-150 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileSecurityIcon size={20} color="#ffffff" />
              <span className="font-medium text-white">Terms of Service</span>
            </div>
            <ArrowRight01Icon size={20} color="#737373" />
          </button>
          <button className="w-full text-left px-5 py-4 hover:bg-dark-150 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CustomerSupportIcon size={20} color="#ffffff" />
              <span className="font-medium text-white">Help & Support</span>
            </div>
            <ArrowRight01Icon size={20} color="#737373" />
          </button>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-5 py-4 hover:bg-red-950 transition-colors text-red-500 font-medium flex items-center gap-3"
          >
            <Logout04Icon size={20} color="#ef4444" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
