import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FieldCard from '@/components/FieldCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { authService } from '@/services/auth';
import { fieldsAPI, Field } from '@/services/api';
import { Plus, X, MapPin, Map, Droplets } from 'lucide-react';
import { toast } from 'sonner';

export default function FieldList() {
  const navigate = useNavigate();
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    crop_type: '',
    location: '',
    latitude: '',
    longitude: '',
    soil_type: '',
    irrigation_type: '',
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchFields = async () => {
      try {
        const realFields = await fieldsAPI.getAll();
        setFields(realFields);
      } catch (error: any) {
        console.error('Load fields failed:', error);
        toast.error('Failed to load fields. Please refresh.');
        setFields([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, [navigate]);

  // FIXED: Complete real add field handler
  const handleAddField = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);

    try {
      const newField = {
        name: formData.name,
        area: parseFloat(formData.area),
        crop_type: formData.crop_type,
        location: formData.location,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        soil_type: formData.soil_type,
        irrigation_type: formData.irrigation_type,
        // polygon: [] // Optional, add later
      };

      const createdField = await fieldsAPI.create(newField);
      toast.success(`Field "${createdField.name}" added successfully!`);

      // Refresh list from backend
      const updatedFields = await fieldsAPI.getAll();
      setFields(updatedFields);

      // Reset form & close modal
      setFormData({
        name: '',
        area: '',
        crop_type: '',
        location: '',
        latitude: '',
        longitude: '',
        soil_type: '',
        irrigation_type: '',
      });
      setShowAddModal(false);
    } catch (error: any) {
      console.error('Add field failed:', error);
      toast.error(error.response?.data?.detail || 'Failed to add field');
    } finally {
      setAdding(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Navbar />
        <div className="text-lg">Loading fields...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Fields</h1>
            <p className="text-gray-600 mt-2">
              {fields.length} {fields.length === 1 ? 'field' : 'fields'} stored in database
            </p>
          </div>
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Field
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Field</DialogTitle>
                <DialogDescription>
                  Enter details for your agricultural field. Data saved to backend database.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddField} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Field Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., North Mustard Field"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (hectares)</Label>
                    <Input
                      id="area"
                      name="area"
                      type="number"
                      step="0.1"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="2.5"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="crop_type">Crop Type</Label>
                    <Input
                      id="crop_type"
                      name="crop_type"
                      value={formData.crop_type}
                      onChange={handleInputChange}
                      placeholder="Mustard, Soybean, etc."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soil_type">Soil Type</Label>
                    <select
                      id="soil_type"
                      name="soil_type"
                      value={formData.soil_type}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select Soil</option>
                      <option value="Loamy">Loamy</option>
                      <option value="Sandy Loam">Sandy Loam</option>
                      <option value="Clay Loam">Clay Loam</option>
                      <option value="Sandy">Sandy</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="irrigation_type">Irrigation</Label>
                    <select
                      id="irrigation_type"
                      name="irrigation_type"
                      value={formData.irrigation_type}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Drip">Drip</option>
                      <option value="Sprinkler">Sprinkler</option>
                      <option value="Flood">Flood</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Alwar, Rajasthan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">
                      Latitude <MapPin className="inline h-3 w-3 ml-1" />
                    </Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder="28.6139"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">
                      Longitude <Map className="inline h-3 w-3 ml-1" />
                    </Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder="77.2090"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                    disabled={adding}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button type="submit" disabled={adding}>
                    {adding ? 'Adding...' : 'Add Field'}
                    <Droplets className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {fields.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-4">No fields yet</p>
            <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700">
              Add Your First Field
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
