import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authAPI } from '@/services/api';
import { authService } from '@/services/auth';
import { Sprout } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Real API call to backend
      const response = await authAPI.login({ email, password });
      
      // Store token and user data
      authService.setToken(response.access_token);
      authService.setUser(response.user);
      
      toast.success(`Welcome back, ${response.user.name}!`);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error messages
      if (error.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('Cannot connect to server. Please ensure backend is running on port 8000.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Sprout className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Welcome to AgriAdvisor</CardTitle>
          <CardDescription>AI-Powered Precision Agriculture Platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 hover:underline font-semibold">
                Register here
              </Link>
            </p>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> Make sure the backend server is running on http://localhost:8000
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}