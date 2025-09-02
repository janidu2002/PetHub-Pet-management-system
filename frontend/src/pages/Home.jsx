import { Link } from 'react-router-dom';
import { Shield, Users, Lock, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Industry-standard security with JWT tokens and encrypted passwords'
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Separate dashboards and permissions for users and administrators'
    },
    {
      icon: Lock,
      title: 'Account Protection',
      description: 'Password management and secure account deletion features'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with modern technologies for optimal performance'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-500">PetHub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A complete pet care platform that unifies appointments, health records, and real-time alerts for owners and vets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-500 font-medium rounded-lg border-2 border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-500 rounded-full mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Why Choose PetHub?
            </h2>
            <div className="space-y-4 text-left">
              {[
                'Dedicated dashboards for pet owners, veterinarians, and admins with role-based features',
                'Easy appointment booking and service management with instant confirmations',
                'Emergency support system with quick access to vets when needed most',
                'Profile management for pets and owners with update and delete options',
                'Secure authentication and data protection for all users',
                'Responsive design ensuring smooth access on mobile, tablet, and desktop'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of pet owners and veterinarians who trust PetHub to manage bookings, health records, and emergency support with ease.
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-500 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Create Your Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;