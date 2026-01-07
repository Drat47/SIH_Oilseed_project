import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FieldList from './pages/FieldList';
import FieldDetail from './pages/FieldDetail';
import Advisory from './pages/Advisory';
import { authService } from './services/auth';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return authService.isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fields"
            element={
              <ProtectedRoute>
                <FieldList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/field/:id"
            element={
              <ProtectedRoute>
                <FieldDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/advisory/:fieldId"
            element={
              <ProtectedRoute>
                <Advisory />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;