# AI-Enabled Precision Advisory Platform for Oilseed Productivity - Development Plan

## Project Overview
A full-stack web application for precision agriculture advisory using ML-based yield prediction for Indian oilseed farmers.

## Tech Stack
- Frontend: React.js with shadcn-ui
- Backend: FastAPI (Python)
- Database: PostgreSQL (via Supabase)
- ML: scikit-learn / XGBoost
- Maps: Leaflet.js
- Auth: Email/password

## Design Guidelines

### Color Palette
- Primary: #16A34A (Agricultural Green)
- Secondary: #0F766E (Teal)
- Accent: #F59E0B (Amber - for alerts)
- Background: #FFFFFF (White)
- Text: #1F2937 (Dark Gray)

### Typography
- Heading: Inter font-weight 700
- Body: Inter font-weight 400
- Navigation: Inter font-weight 600

### Images to Generate
1. hero-farm-field.jpg - Indian agricultural field with oilseed crops (Style: photorealistic, bright daylight)
2. dashboard-background.jpg - Aerial view of farmland with crops (Style: photorealistic, soft focus)
3. satellite-imagery.jpg - Satellite view of agricultural land (Style: photorealistic, NDVI-style coloring)

## Development Tasks

### Phase 1: Frontend (React + shadcn-ui)
1. **Project Structure Setup**
   - Initialize React project structure
   - Install dependencies (react-router-dom, axios, leaflet, recharts)
   - Setup shadcn-ui components

2. **Authentication Pages**
   - src/pages/Login.tsx - Login page with email/password
   - src/pages/Register.tsx - Registration page

3. **Dashboard Pages**
   - src/pages/Dashboard.tsx - Main dashboard with statistics
   - src/pages/FieldList.tsx - List of user's fields
   - src/pages/FieldDetail.tsx - Individual field details with map
   - src/pages/Advisory.tsx - AI-generated advisory recommendations

4. **Components**
   - src/components/Map.tsx - Leaflet map component
   - src/components/FieldCard.tsx - Field summary card
   - src/components/YieldChart.tsx - Yield prediction chart
   - src/components/WeatherWidget.tsx - Weather display
   - src/components/Navbar.tsx - Navigation bar

5. **Services**
   - src/services/api.ts - Axios API client
   - src/services/auth.ts - Authentication service

### Phase 2: Backend (FastAPI)
1. **Backend Structure**
   - backend/main.py - FastAPI application entry point
   - backend/models.py - SQLAlchemy database models
   - backend/schemas.py - Pydantic schemas
   - backend/database.py - Database connection
   - backend/auth.py - Authentication utilities

2. **API Endpoints**
   - POST /api/auth/login - User login
   - POST /api/auth/register - User registration
   - GET /api/fields - Get all fields for user
   - GET /api/fields/{id} - Get field details
   - POST /api/fields - Create new field
   - POST /api/predict_yield - ML yield prediction
   - GET /api/advisory/{field_id} - Get AI advisory

3. **Database Models**
   - User model
   - Field model
   - NDVI data model
   - Weather data model
   - Soil data model
   - Advisory model

### Phase 3: ML Model
1. **ML Pipeline**
   - backend/ml/train_model.py - Model training script
   - backend/ml/predict.py - Prediction functions
   - backend/ml/data_processor.py - Data preprocessing

2. **Model Features**
   - NDVI time series
   - Weather parameters (temp, rainfall)
   - Soil properties (NPK, pH)
   - Historical yield data

### Phase 4: Sample Data
1. **CSV Files**
   - backend/data/fields.csv - Sample field data
   - backend/data/ndvi.csv - NDVI time series
   - backend/data/weather.csv - Weather data
   - backend/data/soil.csv - Soil analysis data
   - backend/data/yield_history.csv - Historical yield

### Phase 5: Database Setup
1. **Supabase Tables**
   - app_cd33c_users
   - app_cd33c_fields
   - app_cd33c_ndvi_data
   - app_cd33c_weather_data
   - app_cd33c_soil_data
   - app_cd33c_advisories

### Phase 6: Integration & Testing
1. Connect frontend to backend APIs
2. Test ML predictions
3. Verify map functionality
4. Test authentication flow

### Phase 7: Documentation
1. README.md - Setup instructions
2. requirements.txt - Python dependencies
3. package.json - Node dependencies