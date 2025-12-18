import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import WeatherWidget from '@/components/WeatherWidget';
import YieldChart from '@/components/YieldChart';
import { authService } from '@/services/auth';
import { MapPin, TrendingUp, AlertCircle, Sprout } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  // Mock data
  const stats = {
    totalFields: 5,
    totalArea: 12.5,
    avgYield: 2850,
    alerts: 2,
  };

  const weatherData = {
    temperature: 28,
    humidity: 65,
    rainfall: 12,
    windSpeed: 15,
  };

  const yieldData = [
    { month: 'Jan', predicted: 2600, actual: 2550 },
    { month: 'Feb', predicted: 2700, actual: 2680 },
    { month: 'Mar', predicted: 2800, actual: 2750 },
    { month: 'Apr', predicted: 2900, actual: 2920 },
    { month: 'May', predicted: 3000 },
    { month: 'Jun', predicted: 3100 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Fields</CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFields}</div>
              <p className="text-xs text-gray-500 mt-1">Active fields</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Area</CardTitle>
              <Sprout className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArea} ha</div>
              <p className="text-xs text-gray-500 mt-1">Under cultivation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Yield</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgYield} kg/ha</div>
              <p className="text-xs text-green-500 mt-1">+8% from last season</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.alerts}</div>
              <p className="text-xs text-amber-600 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <YieldChart data={yieldData} />
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Advisories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Field A - Irrigation Required</p>
                      <p className="text-xs text-gray-600 mt-1">NDVI analysis shows moisture stress. Recommend irrigation within 48 hours.</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Field C - Optimal Growth</p>
                      <p className="text-xs text-gray-600 mt-1">Crop health excellent. Continue current management practices.</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => navigate('/fields')}>
                  View All Fields
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <WeatherWidget weather={weatherData} />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200" variant="outline" onClick={() => navigate('/fields')}>
                  <MapPin className="h-4 w-4 mr-2" />
                  View All Fields
                </Button>
                <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200" variant="outline">
                  <Sprout className="h-4 w-4 mr-2" />
                  Add New Field
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">
                  Based on satellite data and weather patterns, your fields are predicted to yield 12% higher than last season.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}