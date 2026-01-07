import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Sprout, Droplets } from 'lucide-react';
import { Field } from '@/services/api';
import { useNavigate } from 'react-router-dom';

interface FieldCardProps {
  field: Field;
}

export default function FieldCard({ field }: FieldCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/field/${field.id}`)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{field.name}</CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {field.crop_type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{field.area} hectares</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Sprout className="h-4 w-4 mr-2" />
            <span>Soil: {field.soil_type}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Droplets className="h-4 w-4 mr-2" />
            <span>Irrigation: {field.irrigation_type}</span>
          </div>
        </div>
        <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" size="sm">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}