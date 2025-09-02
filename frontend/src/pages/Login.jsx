import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as Yup from 'yup';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Please enter a valid email address')
      .max(100, 'Email must not exceed 100 characters')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must not exceed 50 characters')
      .required('Password is required')
  });

  const validateField = async (fieldName, value) => {
    try {
      await validationSchema.validateAt(fieldName, { ...formData, [fieldName]: value });
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: error.message
      }));
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear general error when user starts typing
    if (errors.general) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.general;
        return newErrors;
      });
    }

    // Validate field if it has been touched
    if (touched[name]) {
      await validateField(name, value);
    }
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setFocusedInput('');
    await validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      email: true,
      password: true
    });

    try {
      // Validate entire form
      await validationSchema.validate(formData, { abortEarly: false });
      
      // Clear errors if validation passes
      setErrors({});
      
      // Proceed with login
      setLoading(true);
      await login(formData.email, formData.password, rememberMe);
    } catch (error) {
      if (error.inner) {
        // Yup validation errors
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        // Login error from API
        console.error('Login error:', error);
        setErrors({ 
          general: error.response?.data?.message || 'Invalid email or password. Please try again.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Secure authentication with JWT tokens',
    'Role-based access control',
    'Protected user data',
    '24/7 account access'
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Info Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-between">
        <div>
          <Link to="/" className="flex items-center text-white mb-20">
            <Shield className="w-10 h-10 mr-3" />
            <span className="text-3xl font-bold">AuthSystem</span>
          </Link>
          
          <div className="space-y-6">
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Welcome back!
            </h1>
            <p className="text-xl text-blue-100">
              Sign in to access your personalized dashboard and manage your account settings.
            </p>
            
            <div className="pt-10 space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-blue-100">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-400 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-blue-200">
          <p className="text-sm">
            © 2025 AuthSystem. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center text-blue-600">
              <Shield className="w-8 h-8 mr-2" />
              <span className="text-2xl font-bold">AuthSystem</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Sign in
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Display general error (e.g., invalid credentials) */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">{errors.general}</p>
                  <p className="text-xs text-red-600 mt-1">
                    Please check your credentials and try again.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${
                  focusedInput === 'email' ? 'text-blue-600' : errors.email && touched.email ? 'text-red-500' : 'text-gray-400'
                }`}>
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={handleBlur}
                  className={`block w-full pl-12 pr-3 py-3 border ${
                    errors.email && touched.email 
                      ? 'border-red-300 bg-red-50' 
                      : focusedInput === 'email' 
                        ? 'border-blue-500' 
                        : 'border-gray-300'
                  } rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="Email address"
                />
                <label htmlFor="email" className="absolute -top-2 left-9 px-2 bg-white text-xs font-medium text-gray-600">
                  Email
                </label>
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.email}
                  </p>
                )}
                {/* Email format hint */}
                {focusedInput === 'email' && !errors.email && formData.email && (
                  <p className="mt-1 text-xs text-gray-500">
                    Example: user@example.com
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${
                  focusedInput === 'password' ? 'text-blue-600' : errors.password && touched.password ? 'text-red-500' : 'text-gray-400'
                }`}>
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={handleBlur}
                  className={`block w-full pl-12 pr-12 py-3 border ${
                    errors.password && touched.password 
                      ? 'border-red-300 bg-red-50' 
                      : focusedInput === 'password' 
                        ? 'border-blue-500' 
                        : 'border-gray-300'
                  } rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="Password"
                />
                <label htmlFor="password" className="absolute -top-2 left-9 px-2 bg-white text-xs font-medium text-gray-600">
                  Password
                </label>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {errors.password && touched.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    Remember me
                  </span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2">Google</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="ml-2">GitHub</span>
                </button>
              </div>

              {/* Security Notice */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-blue-800 font-medium">Secure Connection</p>
                    <p className="text-xs text-blue-600 mt-0.5">
                      Your login is protected with SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Create an account
              </Link>
            </p>
          </div>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700 transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;