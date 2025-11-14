import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components/ui';
import { LockPasswordIcon, Tick02Icon, ArrowLeft01Icon } from 'hugeicons-react';

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
      // Simulate API call
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
        <div className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
          <div className="px-4 py-4 flex items-center max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/sign-in')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all"
            >
              <ArrowLeft01Icon size={24} color="#ffffff" />
            </button>
          </div>
        </div>

        {/* Success Content */}
        <div className="px-4 py-8 max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Tick02Icon size={56} color="#ffffff" strokeWidth={3} />
          </div>
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Check Your Email
          </h1>
          <p className="text-dark-500 text-center text-base mb-4 max-w-sm">
            We've sent a password reset link to:
          </p>
          <p className="text-blue-500 font-semibold text-center mb-8">
            {email}
          </p>
          <p className="text-sm text-dark-600 text-center mb-8 max-w-sm">
            Click the link in the email to reset your password. If you don't see it, check your spam folder.
          </p>
          <div className="w-full max-w-sm space-y-3">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => navigate('/sign-in')}
            >
              Back to Sign In
            </Button>
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
      <div className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all"
          >
            <ArrowLeft01Icon size={24} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 max-w-md mx-auto">
        <div className="mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <LockPasswordIcon size={40} color="#ffffff" />
          </div>
          <h1 className="text-4xl font-bold text-white text-center mb-3">
            Forgot Password?
          </h1>
          <p className="text-dark-500 text-center text-base">
            Enter your email to receive a reset link
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={setEmail}
            error={error}
            required
          />
          <p className="text-sm text-dark-500">
            We'll send you a link to reset your password
          </p>
        </div>

        <div className="space-y-3">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <Button
            variant="outline"
            size="large"
            fullWidth
            onClick={() => navigate('/sign-in')}
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
