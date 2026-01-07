import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}

interface WeatherWidgetProps {
  weather: WeatherData;
}

export default function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Sun className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{weather.temperature}°C</p>
              <p className="text-xs text-gray-500">Temperature</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Cloud className="h-8 w-8 text-gray-400" />
            <div>
              <p className="text-2xl font-bold">{weather.humidity}%</p>
              <p className="text-xs text-gray-500">Humidity</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CloudRain className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{weather.rainfall}mm</p>
              <p className="text-xs text-gray-500">Rainfall</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Wind className="h-8 w-8 text-teal-500" />
            <div>
              <p className="text-2xl font-bold">{weather.windSpeed}</p>
              <p className="text-xs text-gray-500">Wind (km/h)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}