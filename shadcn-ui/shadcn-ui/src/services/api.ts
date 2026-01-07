import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface Field {
  id: number;
  name: string;
  area: number;
  crop_type: string;
  location: {
    lat: number;
    lng: number;
  };
  polygon: Array<[number, number]>;
  soil_type: string;
  irrigation_type: string;
}

export interface YieldPrediction {
  field_id: number;
  predicted_yield: number;
  confidence: number;
  factors: {
    ndvi_score: number;
    weather_score: number;
    soil_score: number;
  };
}

export interface Advisory {
  id: number;
  field_id: number;
  date: string;
  recommendations: string[];
  priority: string;
  expected_impact: string;
}

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

export const fieldsAPI = {
  getAll: async (): Promise<Field[]> => {
    const response = await api.get('/fields');
    return response.data;
  },
  getById: async (id: number): Promise<Field> => {
    const response = await api.get(`/fields/${id}`);
    return response.data;
  },
  create: async (field: Partial<Field>) => {
    const response = await api.post('/fields', field);
    return response.data;
  },
};

export const mlAPI = {
  predictYield: async (fieldId: number): Promise<YieldPrediction> => {
    const response = await api.post('/predict_yield', { field_id: fieldId });
    return response.data;
  },
  getAdvisory: async (fieldId: number): Promise<Advisory> => {
    const response = await api.get(`/advisory/${fieldId}`);
    return response.data;
  },
};

export default api;