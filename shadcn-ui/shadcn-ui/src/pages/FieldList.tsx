import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FieldCard from '@/components/FieldCard';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/auth';
import { Field } from '@/services/api';
import { Plus } from 'lucide-react';

export default function FieldList() {
  const navigate = useNavigate();
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Mock data
    const mockFields: Field[] = [
      {
        id: 1,
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
      },
      {
        id: 2,
        name: 'Field B - South Plot',
        area: 3.2,
        crop_type: 'Groundnut',
        location: { lat: 28.6129, lng: 77.2080 },
        polygon: [
          [28.6129, 77.2080],
          [28.6139, 77.2080],
          [28.6139, 77.2090],
          [28.6129, 77.2090],
        ],
        soil_type: 'Sandy Loam',
        irrigation_type: 'Sprinkler',
      },
      {
        id: 3,
        name: 'Field C - East Plot',
        area: 4.0,
        crop_type: 'Soybean',
        location: { lat: 28.6149, lng: 77.2100 },
        polygon: [
          [28.6149, 77.2100],
          [28.6159, 77.2100],
          [28.6159, 77.2110],
          [28.6149, 77.2110],
        ],
        soil_type: 'Clay Loam',
        irrigation_type: 'Flood',
      },
      {
        id: 4,
        name: 'Field D - West Plot',
        area: 1.8,
        crop_type: 'Sunflower',
        location: { lat: 28.6119, lng: 77.2070 },
        polygon: [
          [28.6119, 77.2070],
          [28.6129, 77.2070],
          [28.6129, 77.2080],
          [28.6119, 77.2080],
        ],
        soil_type: 'Loamy',
        irrigation_type: 'Drip',
      },
      {
        id: 5,
        name: 'Field E - Central Plot',
        area: 1.0,
        crop_type: 'Mustard',
        location: { lat: 28.6134, lng: 77.2085 },
        polygon: [
          [28.6134, 77.2085],
          [28.6139, 77.2085],
          [28.6139, 77.2090],
          [28.6134, 77.2090],
        ],
        soil_type: 'Sandy',
        irrigation_type: 'Sprinkler',
      },
    ];

    setFields(mockFields);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Fields</h1>
            <p className="text-gray-600 mt-2">Manage and monitor your agricultural fields</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Field
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
            <FieldCard key={field.id} field={field} />
          ))}
        </div>
      </div>
    </div>
  );
}