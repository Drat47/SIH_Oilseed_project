import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/auth';
import { Sprout, LogOut, LayoutDashboard, Map } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const user = authService.getUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">AgriAdvisor</span>
            </Link>
            
            {isAuthenticated && (
              <div className="hidden md:ml-10 md:flex md:space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/fields"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition"
                >
                  <Map className="h-4 w-4 mr-2" />
                  My Fields
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">
                  Welcome, <span className="font-semibold">{user?.name}</span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}