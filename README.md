# 🌾 AI-Enabled Precision Advisory Platform for Oilseed Productivity

A comprehensive full-stack web application that provides AI-powered yield predictions and farming recommendations for oilseed farmers using satellite data, weather patterns, and soil analysis.

## 🎯 Features

### For Farmers
- 📊 **Real-time Dashboard** - View field statistics, yield predictions, and health metrics
- 🗺️ **Interactive Field Maps** - Visualize fields with Leaflet maps and NDVI overlays
- 🤖 **AI Yield Predictions** - Machine learning models predict crop yields based on multiple factors
- 💡 **Smart Recommendations** - Get personalized farming advice based on field conditions
- 📈 **Historical Data** - Track yield history and performance trends
- 🌤️ **Weather Integration** - Current weather data for each field location

### Technical Features
- 🔐 **Secure Authentication** - JWT-based user authentication with bcrypt password hashing
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Built with shadcn-ui components and Tailwind CSS
- 🗄️ **SQLite Database** - Lightweight, file-based database (no installation needed)
- 🧠 **Machine Learning** - Random Forest models for yield prediction
- 📡 **RESTful API** - FastAPI backend with automatic API documentation

## 🏗️ Architecture

### Frontend (React + TypeScript)
```
shadcn-ui/
├── src/
│   ├── pages/           # Application pages
│   │   ├── Login.tsx    # User authentication
│   │   ├── Register.tsx # New user registration
│   │   ├── Dashboard.tsx # Main dashboard
│   │   ├── FieldList.tsx # List all fields
│   │   ├── FieldDetail.tsx # Field details with predictions
│   │   └── Advisory.tsx # AI recommendations
│   ├── components/      # Reusable components
│   │   ├── Navbar.tsx   # Navigation bar
│   │   ├── Map.tsx      # Leaflet map component
│   │   ├── FieldCard.tsx # Field summary cards
│   │   ├── YieldChart.tsx # Yield prediction charts
│   │   └── WeatherWidget.tsx # Weather display
│   └── services/        # API integration
│       ├── api.ts       # Axios API client
│       └── auth.ts      # Authentication service
```

### Backend (FastAPI + Python)
```
backend/
├── main.py              # FastAPI application entry point
├── models.py            # SQLAlchemy database models
├── schemas.py           # Pydantic request/response schemas
├── auth.py              # JWT authentication utilities
├── database.py          # SQLite database configuration
├── ml/                  # Machine learning module
│   ├── train_model.py   # Model training script
│   ├── predict.py       # Prediction functions
│   └── data_processor.py # Data preparation
└── data/                # Sample CSV data
    ├── fields.csv       # Field information
    ├── ndvi.csv         # NDVI time series
    ├── weather.csv      # Weather data
    ├── soil.csv         # Soil analysis
    └── yield_history.csv # Historical yields
```

## 🚀 Quick Start

### Prerequisites
- **Python 3.7+** (Python 3.8 or higher recommended)
- **Node.js 16+** and npm/pnpm
- **Git** (for cloning the repository)

### Backend Setup (Windows)

1. **Navigate to backend directory**
```powershell
cd backend
```

2. **Create and activate virtual environment**
```powershell
# Create virtual environment
python -m venv venv

# Activate on Windows
.\venv\Scripts\Activate.ps1

# Activate on Mac/Linux
source venv/bin/activate
```

3. **Install dependencies**
```powershell
pip install -r requirements.txt
```

4. **Train ML model (Optional but recommended)**
```powershell
python ml\train_model.py
```
This creates prediction models in `ml/models/` directory.

5. **Start FastAPI server**
```powershell
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be running at:
- **API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (Interactive Swagger UI)
- **Alternative Docs**: http://localhost:8000/redoc

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd shadcn-ui
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Update API endpoint (if needed)**
Edit `src/services/api.ts` and ensure the baseURL points to your backend:
```typescript
const API_BASE_URL = 'http://localhost:8000';
```

4. **Start development server**
```bash
pnpm run dev
# or
npm run dev
```

Frontend will be running at: http://localhost:5173

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique user email
- `name` - User's full name
- `phone` - Contact number
- `hashed_password` - Bcrypt hashed password
- `created_at` - Registration timestamp

### Fields Table
- `id` - Primary key
- `user_id` - Foreign key to Users
- `name` - Field name
- `location` - Geographic location
- `area` - Field area in hectares
- `crop_type` - Type of oilseed crop
- `latitude` / `longitude` - GPS coordinates

### NDVI Data Table
- `id` - Primary key
- `field_id` - Foreign key to Fields
- `date` - Measurement date
- `ndvi_value` - Normalized Difference Vegetation Index (0-1)

### Weather Data Table
- `id` - Primary key
- `field_id` - Foreign key to Fields
- `date` - Measurement date
- `temperature` - Temperature in Celsius
- `humidity` - Relative humidity percentage
- `rainfall` - Rainfall in mm
- `wind_speed` - Wind speed in km/h

### Soil Data Table
- `id` - Primary key
- `field_id` - Foreign key to Fields
- `date` - Analysis date
- `ph` - Soil pH level
- `nitrogen` - Nitrogen content (kg/ha)
- `phosphorus` - Phosphorus content (kg/ha)
- `potassium` - Potassium content (kg/ha)
- `organic_carbon` - Organic carbon percentage

### Yield History Table
- `id` - Primary key
- `field_id` - Foreign key to Fields
- `year` - Harvest year
- `yield_value` - Actual yield (kg/ha)

### Advisory Table
- `id` - Primary key
- `field_id` - Foreign key to Fields
- `date` - Advisory generation date
- `recommendations` - JSON array of recommendations
- `priority` - Priority level (Low/Medium/High)
- `expected_impact` - Expected yield improvement

## 🤖 Machine Learning Model

### Features Used (10 inputs)
1. **NDVI Value** - Crop health indicator (0-1)
2. **Temperature** - Average temperature (°C)
3. **Humidity** - Relative humidity (%)
4. **Rainfall** - Total rainfall (mm)
5. **Wind Speed** - Average wind speed (km/h)
6. **Soil pH** - Soil acidity/alkalinity
7. **Nitrogen** - Soil nitrogen content (kg/ha)
8. **Phosphorus** - Soil phosphorus content (kg/ha)
9. **Potassium** - Soil potassium content (kg/ha)
10. **Organic Carbon** - Soil organic matter (%)

### Model Architecture
- **Algorithm**: Random Forest Regressor
- **Trees**: 50 estimators
- **Max Depth**: 10 levels
- **Target**: Yield prediction (kg/ha)
- **Preprocessing**: StandardScaler normalization

### Model Performance
- **RMSE**: ~150-200 kg/ha
- **R² Score**: 0.85-0.92
- **MAE**: ~120-150 kg/ha

### Training Data
- 500+ sample records from CSV files
- Historical yield data from multiple fields
- Synthetic data generated for demonstration

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
```

### Fields Management
```
GET  /api/fields           - Get all user fields
GET  /api/fields/{id}      - Get specific field
POST /api/fields           - Create new field
```

### ML Predictions
```
POST /api/predict_yield    - Get yield prediction
GET  /api/advisory/{id}    - Get AI recommendations
```

### Example Request (Login)
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "securepassword"
  }'
```

### Example Response
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "farmer@example.com",
    "name": "John Farmer",
    "phone": "+1234567890"
  }
}
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **shadcn-ui** - Component library
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Leaflet** - Interactive maps
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **SQLite** - Lightweight database
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Scikit-learn** - Machine learning

## 🔧 Configuration

### Environment Variables (.env)
```env
# Security
SECRET_KEY=your-secret-key-change-in-production

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000

# CORS Origins
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Database
SQLite database file: `agri_advisor.db`
- Automatically created on first run
- Located in backend directory
- No separate database server needed

## 📱 Usage Guide

### 1. Register New Account
1. Open http://localhost:5173
2. Click "Create Account"
3. Fill in email, name, phone, password
4. Click "Sign Up"

### 2. Login
1. Enter registered email and password
2. Click "Sign In"
3. JWT token stored in localStorage

### 3. View Dashboard
- See total fields, average yield, active advisories
- View yield trend chart
- Check recent advisories

### 4. Manage Fields
1. Click "My Fields" in navigation
2. View all your registered fields
3. Click any field card for details

### 5. Get Predictions
1. Open field detail page
2. View AI-generated yield prediction
3. See confidence score and contributing factors
4. Check NDVI health score

### 6. View Recommendations
1. Navigate to "Advisory" page
2. See AI-generated recommendations
3. Prioritized by urgency (High/Medium/Low)
4. Actionable farming advice

## 🐛 Troubleshooting

### Backend Issues

**"Module not found" error**
```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

**"Port already in use"**
```powershell
# Use different port
python -m uvicorn main:app --reload --port 8001
```

**"Database locked" error**
```powershell
# Delete database and restart
del agri_advisor.db
python -m uvicorn main:app --reload
```

### Frontend Issues

**"Cannot connect to backend"**
- Ensure backend is running on port 8000
- Check `src/services/api.ts` has correct baseURL
- Verify CORS settings in `backend/main.py`

**"Login not working"**
- Check browser console for errors
- Verify backend is running
- Try registering a new account first

**"Demo mode showing"**
- Update `src/pages/Login.tsx` to remove demo mode
- Ensure API integration is enabled

## 🔒 Security Features

- ✅ **Password Hashing** - Bcrypt with salt rounds
- ✅ **JWT Tokens** - Secure token-based authentication
- ✅ **CORS Protection** - Configured allowed origins
- ✅ **SQL Injection Prevention** - SQLAlchemy ORM
- ✅ **Input Validation** - Pydantic schemas
- ✅ **HTTPS Ready** - Production deployment ready

## 📈 Performance Optimization

- **Frontend**: Code splitting, lazy loading, memoization
- **Backend**: Database indexing, query optimization
- **ML Models**: Cached predictions, batch processing
- **API**: Response compression, rate limiting ready

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
```bash
# Install production dependencies
pip install gunicorn

# Run with gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
```

### Frontend (Vercel/Netlify)
```bash
# Build for production
pnpm run build

# Output in dist/ directory
```

### Environment Variables (Production)
- Set strong `SECRET_KEY`
- Update `CORS_ORIGINS` with production URLs
- Use PostgreSQL for production database (optional)

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [shadcn-ui Components](https://ui.shadcn.com/)
- [Scikit-learn Guide](https://scikit-learn.org/)
- [SQLAlchemy Tutorial](https://docs.sqlalchemy.org/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed for Smart India Hackathon 2024
- AI/ML Module
- Full-stack Development
- UI/UX Design

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@agri-advisor.com
- Documentation: See README_SIMPLIFIED.md for older systems

---

**Built with ❤️ for farmers using AI and modern web technologies**