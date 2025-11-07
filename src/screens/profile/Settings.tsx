import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, BottomNavigation } from '../../components/ui';
import { Edit, Wallet, Bell, Lock, LogOut, ChevronRight, ArrowLeft } from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      signOut();
      navigate('/welcome');
    }
  };

  const settingsOptions = [
    {
      icon: Edit,
      label: 'Edit Profile',
      description: 'Update your profile information',
      onClick: () => navigate('/profile/edit'),
    },
    {
      icon: Wallet,
      label: 'Wallet & Tokens',
      description: 'Manage your Epiko Tokens',
      onClick: () => navigate('/wallet'),
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Manage notification preferences',
      onClick: () => navigate('/notifications'),
    },
    {
      icon: Lock,
      label: 'Privacy & Security',
      description: 'Control your privacy settings',
      onClick: () => alert('Privacy settings coming soon'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
      </header>

      {/* Settings Options */}
      <main className="p-6 space-y-4">
        {/* Account Settings */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Account
          </h2>
          <Card className="divide-y divide-gray-100">
            {settingsOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  onClick={option.onClick}
                  className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </Card>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Danger Zone
          </h2>
          <Card>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-4 flex items-center gap-4 hover:bg-red-50 transition-colors text-red-600"
            >
              <div className="p-2 bg-red-100 rounded-lg">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold">Sign Out</p>
                <p className="text-sm text-red-500">Sign out of your account</p>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
          </Card>
        </section>

        {/* App Info */}
        <div className="text-center pt-4 space-y-2">
          <p className="text-sm text-gray-500">Lorven Studios AI</p>
          <p className="text-xs text-gray-400">Version 1.0.0</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Settings;
