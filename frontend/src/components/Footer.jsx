import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AuthSystem</h3>
            <p className="text-gray-400">
              A complete authentication system with role-based access control.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
              <li><a href="/register" className="hover:text-white transition-colors">Register</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">
              Email: support@authsystem.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by AuthSystem Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;