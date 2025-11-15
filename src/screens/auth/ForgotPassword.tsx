import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui';
import { ArrowLeft01Icon, CheckmarkCircle02Icon, Mail01Icon } from 'hugeicons-react';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (validateEmail()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1500);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="bg-black border-b border-dark-100">
          <div className="px-4 py-4 max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/sign-in')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:bg-dark-150 transition-colors"
            >
              <ArrowLeft01Icon size={24} color="#ffffff" />
            </button>
          </div>
        </header>

        {/* Success Content */}
        <div className="px-4 py-8 max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-20 h-20 bg-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckmarkCircle02Icon size={48} color="#ffffff" />
          </div>
          <h1 className="text-3xl font-bold text-white text-center mb-3">
            Check Your Email
          </h1>
          <p className="text-base text-dark-500 text-center mb-3 max-w-sm">
            We've sent a password reset link to:
          </p>
          <p className="text-white font-semibold text-center mb-6">
            {email}
          </p>
          <p className="text-sm text-dark-500 text-center mb-8 max-w-sm">
            Click the link in the email to reset your password. If you don't see it, check your spam folder.
          </p>
          <div className="w-full max-w-sm space-y-3">
            <button
              onClick={() => navigate('/sign-in')}
              className="w-full bg-white text-black font-semibold text-base py-3 rounded-xl hover:bg-gray-100 active:scale-98 transition-all"
            >
              Back to Sign In
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full text-center text-dark-500 hover:text-white text-sm font-semibold transition-colors"
            >
              Resend Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-dark-100">
        <div className="px-4 py-4 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:bg-dark-150 transition-colors"
          >
            <ArrowLeft01Icon size={24} color="#ffffff" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-8 max-w-md mx-auto">
        <div className="mb-8 pt-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-base text-dark-500">
            Enter your email to receive a reset link
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={setEmail}
            error={error}
            required
          />
          <div className="flex items-center gap-2 text-sm text-dark-500">
            <Mail01Icon size={16} color="#737373" />
            <span>We'll send you a link to reset your password</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black font-semibold text-base py-3 rounded-xl hover:bg-gray-100 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          <button
            onClick={() => navigate('/sign-in')}
            className="w-full bg-dark-100 text-white font-semibold text-base py-3 rounded-xl hover:bg-dark-150 active:scale-98 transition-all"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
