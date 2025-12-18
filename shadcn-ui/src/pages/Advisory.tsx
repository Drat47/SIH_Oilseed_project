import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { authService } from '@/services/auth';
import { Advisory } from '@/services/api';
import { ArrowLeft, AlertCircle, CheckCircle, TrendingUp, Droplets, Sprout } from 'lucide-react';

export default function AdvisoryPage() {
  const navigate = useNavigate();
  const { fieldId } = useParams();
  const [advisory, setAdvisory] = useState<Advisory | null>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Mock advisory data
    const mockAdvisory: Advisory = {
      id: 1,
      field_id: parseInt(fieldId || '1'),
      date: new Date().toISOString(),
      recommendations: [
        'Maintain current drip irrigation schedule of 2 hours daily',
        'Apply nitrogen fertilizer (50 kg/ha) in the next 10 days',
        'Monitor for pest activity, especially aphids, given current weather conditions',
        'Prepare for light rainfall expected in 3 days - adjust irrigation',
        'Consider foliar spray of micronutrients to boost crop health',
      ],
      priority: 'Medium',
      expected_impact: 'Following these recommendations can improve yield by 8-12%',
    };

    setAdvisory(mockAdvisory);
  }, [fieldId, navigate]);

  if (!advisory) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(`/field/${fieldId}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Field Details
        </Button>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI-Generated Advisory</h1>
              <p className="text-gray-600 mt-2">
                Generated on {new Date(advisory.date).toLocaleDateString('en-IN')}
              </p>
            </div>
            <Badge
              className={
                advisory.priority === 'High'
                  ? 'bg-red-100 text-red-800'
                  : advisory.priority === 'Medium'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-green-100 text-green-800'
              }
            >
              {advisory.priority} Priority
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Expected Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{advisory.expected_impact}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advisory.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-800">{rec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center mb-3">
                  <Sprout className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-semibold">Crop Health Assessment</h3>
                </div>
                <p className="text-sm text-gray-700 ml-7">
                  NDVI analysis indicates healthy crop growth with an index of 0.78. Chlorophyll content
                  is optimal, suggesting good photosynthetic activity. No signs of stress detected in
                  satellite imagery from the past week.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Droplets className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold">Soil & Water Management</h3>
                </div>
                <p className="text-sm text-gray-700 ml-7">
                  Current soil moisture levels are adequate at 65%. Drip irrigation system is functioning
                  efficiently. Weather forecast shows light rainfall (12mm) expected in 3 days, so reduce
                  irrigation by 30% starting 2 days before expected rainfall to prevent waterlogging.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="font-semibold">Risk Factors</h3>
                </div>
                <p className="text-sm text-gray-700 ml-7">
                  Temperature fluctuations and humidity levels create favorable conditions for aphid
                  infestation. Regular monitoring recommended. Soil nitrogen levels are slightly below
                  optimal range - supplementation advised to maintain yield potential.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">AI Confidence Score</h3>
                  <p className="text-sm opacity-90">
                    This advisory is generated with 87% confidence based on satellite data, weather
                    patterns, soil analysis, and historical yield data from similar fields in your region.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              Mark as Implemented
            </Button>
            <Button variant="outline" className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border-gray-200">
              Download PDF Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}