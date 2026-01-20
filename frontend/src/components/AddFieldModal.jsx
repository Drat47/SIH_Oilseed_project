import { useState, useEffect } from 'react'
import { INDIAN_LOCATIONS } from '../data/locations'

const AddFieldModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        state: '',
        district: '',
        crop_type: '',
        area_ha: '',
        latitude: '',
        longitude: ''
    })

    const [availableDistricts, setAvailableDistricts] = useState([])

    // Update districts when state changes
    useEffect(() => {
        if (formData.state && INDIAN_LOCATIONS[formData.state]) {
            setAvailableDistricts(Object.keys(INDIAN_LOCATIONS[formData.state]))
            // Reset district if state changes
            setFormData(prev => ({ ...prev, district: '', latitude: '', longitude: '' }))
        } else {
            setAvailableDistricts([])
        }
    }, [formData.state])

    // Update Lat/Lon when district changes
    useEffect(() => {
        if (formData.state && formData.district && INDIAN_LOCATIONS[formData.state][formData.district]) {
            const coords = INDIAN_LOCATIONS[formData.state][formData.district]
            setFormData(prev => ({
                ...prev,
                latitude: coords.lat,
                longitude: coords.lng
            }))
        }
    }, [formData.district, formData.state])


    if (!isOpen) return null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Convert numeric fields
        const payload = {
            ...formData,
            area_ha: parseFloat(formData.area_ha),
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude)
        }
        onAdd(payload)
        setFormData({
            name: '',
            state: '',
            district: '',
            crop_type: '',
            area_ha: '',
            latitude: '',
            longitude: ''
        })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-2xl font-bold">Add New Field</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Field Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required className="w-full rounded border p-2" placeholder="e.g. Riverside Plot" />
                    </div>

                    {/* State & District Section */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">State</label>
                            <select name="state" value={formData.state} onChange={handleChange} required className="w-full rounded border p-2">
                                <option value="">Select State</option>
                                {Object.keys(INDIAN_LOCATIONS).map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">District</label>
                            <select name="district" value={formData.district} onChange={handleChange} required disabled={!formData.state} className="w-full rounded border p-2 mb-1">
                                <option value="">Select District</option>
                                {availableDistricts.map(dist => (
                                    <option key={dist} value={dist}>{dist}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500">Auto-fills Coordinates</p>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Crop Type</label>
                            <select name="crop_type" value={formData.crop_type} onChange={handleChange} required className="w-full rounded border p-2">
                                <option value="">Select Crop</option>
                                <option value="Soybean">Soybean</option>
                                <option value="Groundnut">Groundnut</option>
                                <option value="Sunflower">Sunflower</option>
                                <option value="Mustard">Mustard</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Area (ha)</label>
                            <input name="area_ha" type="number" step="0.1" value={formData.area_ha} onChange={handleChange} required className="w-full rounded border p-2" />
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded border border-gray-100">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase">Latitude</label>
                            <input name="latitude" type="number" step="0.000001" value={formData.latitude} onChange={handleChange} required className="w-full rounded border-0 bg-transparent p-0 text-sm font-mono text-gray-800 focus:ring-0" readOnly />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase">Longitude</label>
                            <input name="longitude" type="number" step="0.000001" value={formData.longitude} onChange={handleChange} required className="w-full rounded border-0 bg-transparent p-0 text-sm font-mono text-gray-800 focus:ring-0" readOnly />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">Add Field</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFieldModal
