import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../../components/ui';
import { ArrowLeft01Icon, Camera01Icon } from 'hugeicons-react';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    bio: 'AI content creator ✨ | Exploring the creative possibilities',
    avatar: user?.avatar || '👤',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigate('/profile');
      }, 1000);
    }
  };

  const avatarOptions = ['👤', '👨', '👩', '👨‍💼', '👩‍💼', '👨‍🎨', '👩‍🎨', '🧑‍🎨', '👨‍💻', '👩‍💻'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b-2 border-gray-200 px-6 py-5 sticky top-0 z-10 shadow-soft">
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <ArrowLeft01Icon size={20} color="#374151" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Profile</h1>
          </div>
          <Button
            variant="primary"
            size="medium"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 max-w-md mx-auto space-y-6">
        {/* Avatar Selection */}
        <section className="animate-slide-up">
          <label className="block text-sm font-bold text-gray-900 mb-3">Profile Picture</label>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-5xl shadow-medium border-4 border-white">
                {formData.avatar}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-medium border-2 border-white hover:bg-blue-700 transition-all duration-300 hover:scale-110 active:scale-95">
                <Camera01Icon size={16} color="#ffffff" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar}
                onClick={() => setFormData({ ...formData, avatar })}
                className={`aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center text-3xl hover:scale-110 transition-all duration-300 shadow-soft hover:shadow-medium border-2 ${
                  formData.avatar === avatar
                    ? 'border-blue-600 shadow-lg scale-105'
                    : 'border-gray-200'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </section>

        {/* Form Fields */}
        <section className="space-y-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(value) => setFormData({ ...formData, fullName: value })}
            error={errors.fullName}
            required
          />

          <Input
            label="Username"
            type="text"
            placeholder="johndoe"
            value={formData.username}
            onChange={(value) => setFormData({ ...formData, username: value })}
            error={errors.username}
            required
          />

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full px-4 py-3.5 border-2 border-gray-400 rounded-xl focus:outline-none focus:border-blue-600 transition-all duration-300 shadow-soft text-gray-900 font-medium resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">{formData.bio.length}/150 characters</p>
          </div>
        </section>

        {/* Account Stats */}
        <section className="p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 rounded-2xl shadow-medium border-2 border-blue-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Your Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-600 font-medium">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1.2K</p>
              <p className="text-xs text-gray-600 font-medium">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">345</p>
              <p className="text-xs text-gray-600 font-medium">Following</p>
            </div>
          </div>
        </section>

        {/* Delete Account */}
        <section className="pt-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => confirm('Are you sure you want to delete your account? This action cannot be undone.') && alert('Account deletion coming soon')}
            className="w-full px-5 py-4 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all duration-300 border-2 border-red-200 shadow-soft hover:shadow-medium"
          >
            Delete Account
          </button>
        </section>
      </main>
    </div>
  );
};

export default EditProfile;
