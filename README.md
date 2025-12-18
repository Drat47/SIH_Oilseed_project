<<<<<<< HEAD
# AI-Enabled Precision Advisory Platform for Oilseed Productivity (India)

A complete full-stack web application for precision agriculture advisory using ML-based yield prediction for Indian oilseed farmers.

## 🚀 Tech Stack

### Frontend
- **React.js** with TypeScript
- **shadcn-ui** component library
- **Tailwind CSS** for styling
- **Leaflet.js** for interactive maps
- **Recharts** for data visualization
- **Axios** for API communication

### Backend
- **FastAPI** (Python)
- **PostgreSQL** database (via Supabase)
- **SQLAlchemy** ORM
- **JWT** authentication

### Machine Learning
- **scikit-learn** for ML models
- **XGBoost** for gradient boosting
- **pandas** & **numpy** for data processing

## 📁 Project Structure

```
/workspace/
├── shadcn-ui/                 # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Map.tsx
│   │   │   ├── FieldCard.tsx
│   │   │   ├── YieldChart.tsx
│   │   │   └── WeatherWidget.tsx
│   │   ├── pages/             # Application pages
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── FieldList.tsx
│   │   │   ├── FieldDetail.tsx
│   │   │   └── Advisory.tsx
│   │   ├── services/          # API services
│   │   │   ├── api.ts
│   │   │   └── auth.ts
│   │   └── App.tsx
│   └── package.json
│
└── backend/                   # Backend FastAPI application
    ├── main.py                # FastAPI application entry
    ├── models.py              # Database models
    ├── schemas.py             # Pydantic schemas
    ├── auth.py                # Authentication utilities
    ├── database.py            # Database connection
    ├── ml/                    # Machine Learning module
    │   ├── train_model.py     # Model training script
    │   ├── predict.py         # Prediction functions
    │   └── data_processor.py  # Data preprocessing
    ├── data/                  # Sample CSV data
    │   ├── fields.csv
    │   ├── ndvi.csv
    │   ├── weather.csv
    │   ├── soil.csv
    │   └── yield_history.csv
    └── requirements.txt
```

## 🎯 Features

### 1. **User Authentication**
- Email/password registration and login
- JWT token-based authentication
- Protected routes

### 2. **Field Management**
- Add and manage multiple agricultural fields
- Interactive map visualization with Leaflet
- Field details including crop type, soil, irrigation

### 3. **AI Yield Prediction**
- ML-based yield prediction using:
  - NDVI (Normalized Difference Vegetation Index)
  - Weather data (temperature, rainfall, humidity)
  - Soil properties (NPK, pH, organic carbon)
- Confidence scores and factor analysis

### 4. **Smart Advisory System**
- AI-generated recommendations
- Priority-based alerts
- Actionable insights for:
  - Irrigation management
  - Fertilizer application
  - Pest monitoring
  - Weather-based decisions

### 5. **Dashboard & Analytics**
- Overview statistics
- Yield trend charts
- Weather widgets
- Recent advisories

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- PostgreSQL (optional, can use Supabase)

### Frontend Setup

```bash
# Navigate to frontend directory
cd /workspace/shadcn-ui

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
# Navigate to backend directory
cd /workspace/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create .env file with:
# DATABASE_URL=postgresql://user:password@localhost:5432/agri_advisor

# Train ML model (optional, mock data available)
python ml/train_model.py

# Start FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will run on `http://localhost:8000`

### Database Setup (PostgreSQL)

```sql
-- Create database
CREATE DATABASE agri_advisor;

-- Tables will be created automatically by SQLAlchemy
-- when you run the FastAPI application
```

**Alternative: Use Supabase** (Recommended for demo)
- The application is configured to work with Supabase
- Supabase provides PostgreSQL database, authentication, and more
- Update DATABASE_URL in backend/.env with your Supabase connection string

## 🎮 How to Use

### 1. **Register/Login**
- Open `http://localhost:5173`
- Register a new account or login
- **Demo Mode**: Any email/password works in demo mode

### 2. **View Dashboard**
- See overview of all fields
- View statistics and recent advisories
- Check current weather conditions

### 3. **Manage Fields**
- Navigate to "My Fields"
- View list of all agricultural fields
- Click on any field for detailed information

### 4. **Field Details**
- View field on interactive map
- See yield predictions with confidence scores
- Check health factors (NDVI, Weather, Soil)
- Get AI-generated advisories

### 5. **AI Advisory**
- Click "View Detailed Advisory"
- Get specific recommendations
- See expected impact on yield
- Priority-based action items

## 📊 Sample Data

The application includes sample CSV files with realistic data:

- **fields.csv**: 5 sample fields with different crops
- **ndvi.csv**: NDVI time series data
- **weather.csv**: Weather parameters (temp, rainfall, humidity, wind)
- **soil.csv**: Soil analysis (NPK, pH, organic carbon)
- **yield_history.csv**: Historical yield data

## 🤖 Machine Learning Model

### Features Used
1. **NDVI Value** (0-1): Vegetation health indicator
2. **Temperature** (°C): Average temperature
3. **Humidity** (%): Relative humidity
4. **Rainfall** (mm): Total rainfall
5. **Wind Speed** (km/h): Average wind speed
6. **Soil pH**: Soil acidity/alkalinity
7. **Nitrogen** (kg/ha): Nitrogen content
8. **Phosphorus** (kg/ha): Phosphorus content
9. **Potassium** (kg/ha): Potassium content
10. **Organic Carbon** (%): Soil organic matter

### Models
- **Random Forest Regressor**: Ensemble learning method
- **XGBoost**: Gradient boosting algorithm

### Training
```bash
cd /workspace/backend
python ml/train_model.py
```

This will:
- Load and process data
- Train both models
- Evaluate performance (RMSE, MAE, R²)
- Save models to `ml/models/` directory

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Fields
- `GET /api/fields` - Get all user fields
- `GET /api/fields/{id}` - Get field details
- `POST /api/fields` - Create new field

### ML & Advisory
- `POST /api/predict_yield` - Get yield prediction
- `GET /api/advisory/{field_id}` - Get AI advisory

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Maps**: Leaflet-based field visualization
- **Real-time Charts**: Recharts for yield trends
- **Modern UI**: shadcn-ui components with Tailwind CSS
- **Dark Mode Ready**: Can be enabled in theme settings

## 🔐 Security

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration for frontend-backend communication

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/agri_advisor
SECRET_KEY=your-secret-key-change-in-production
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd /workspace/shadcn-ui
pnpm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/AWS)
```bash
cd /workspace/backend
# Set environment variables
# Deploy with uvicorn
```

## 📈 Future Enhancements

- Real Google Earth Engine integration for NDVI
- Weather API integration (IMD, OpenWeatherMap)
- Mobile app (React Native)
- Multi-language support (Hindi, regional languages)
- SMS/WhatsApp alerts
- Crop disease detection using computer vision
- Market price integration
- Government scheme recommendations

## 🤝 Contributing

This is a demo/prototype application. For production use:
1. Replace mock data with real APIs
2. Implement proper database migrations
3. Add comprehensive error handling
4. Implement rate limiting
5. Add logging and monitoring
6. Enhance security measures

## 📄 License

MIT License - Free to use for educational and commercial purposes

## 👥 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for Indian Farmers**
=======
# SIH_Oilseed_project
A solution for the SIH 2025 Oilseed yield optimization problem
>>>>>>> 106b65d23d57af1e5c526ded93570f8dd9e8abaf
