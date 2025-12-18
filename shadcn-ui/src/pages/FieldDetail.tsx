import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Map from '@/components/Map';
import YieldChart from '@/components/YieldChart';
import { authService } from '@/services/auth';
import { Field, YieldPrediction } from '@/services/api';
import { ArrowLeft, TrendingUp, Droplets, Thermometer, CloudRain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function FieldDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [field, setField] = useState<Field | null>(null);
  const [prediction, setPrediction] = useState<YieldPrediction | null>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Mock field data
    const mockField: Field = {
      id: parseInt(id || '1'),
      name: 'Field A - North Plot',
      area: 2.5,
      crop_type: 'Mustard',
      location: { lat: 28.6139, lng: 77.2090 },
      polygon: [
        [28.6139, 77.2090],
        [28.6149, 77.2090],
        [28.6149, 77.2100],
        [28.6139, 77.2100],
      ],
      soil_type: 'Loamy',
      irrigation_type: 'Drip',
    };

    const mockPrediction: YieldPrediction = {
      field_id: parseInt(id || '1'),
      predicted_yield: 2850,
      confidence: 87,
      factors: {
        ndvi_score: 0.78,
        weather_score: 0.82,
        soil_score: 0.75,
      },
    };

    setField(mockField);
    setPrediction(mockPrediction);
  }, [id, navigate]);

  const yieldData = [
    { month: 'Week 1', predicted: 2600 },
    { month: 'Week 2', predicted: 2700 },
    { month: 'Week 3', predicted: 2750 },
    { month: 'Week 4', predicted: 2850 },
  ];

  if (!field) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate('/fields')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Fields
        </Button>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{field.name}</h1>
              <p className="text-gray-600 mt-2">{field.area} hectares • {field.crop_type}</p>
            </div>
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
              Active
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Field Location</CardTitle>
              </CardHeader>
              <CardContent>
                <Map
                  center={[field.location.lat, field.location.lng]}
                  polygon={field.polygon}
                  height="400px"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yield Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Predicted Yield</span>
                    <span className="text-2xl font-bold text-green-600">
                      {prediction?.predicted_yield} kg/ha
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Confidence</span>
                    <span className="text-sm font-semibold">{prediction?.confidence}%</span>
                  </div>
                  <Progress value={prediction?.confidence} className="mt-2" />
                </div>
                <YieldChart data={yieldData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Advisory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Optimal Growth Detected</h4>
                    <p className="text-sm text-gray-700">
                      NDVI analysis shows healthy crop growth. Continue current irrigation schedule.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Weather Advisory</h4>
                    <p className="text-sm text-gray-700">
                      Light rainfall expected in 3 days. Adjust irrigation accordingly to prevent waterlogging.
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">Nutrient Management</h4>
                    <p className="text-sm text-gray-700">
                      Soil analysis suggests nitrogen supplementation in 2 weeks for optimal yield.
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => navigate(`/advisory/${field.id}`)}>
                  View Detailed Advisory
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Field Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Crop Type</p>
                  <p className="font-semibold">{field.crop_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Soil Type</p>
                  <p className="font-semibold">{field.soil_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Irrigation</p>
                  <p className="font-semibold">{field.irrigation_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="font-semibold">{field.area} hectares</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Factors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">NDVI Score</span>
                    </div>
                    <span className="text-sm font-semibold">
                      {((prediction?.factors.ndvi_score || 0) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={(prediction?.factors.ndvi_score || 0) * 100} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <CloudRain className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm">Weather Score</span>
                    </div>
                    <span className="text-sm font-semibold">
                      {((prediction?.factors.weather_score || 0) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={(prediction?.factors.weather_score || 0) * 100} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm">Soil Score</span>
                    </div>
                    <span className="text-sm font-semibold">
                      {((prediction?.factors.soil_score || 0) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={(prediction?.factors.soil_score || 0) * 100} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Current Temperature</span>
                  <span className="font-semibold">28°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Soil Moisture</span>
                  <span className="font-semibold">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Days to Harvest</span>
                  <span className="font-semibold">45 days</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}