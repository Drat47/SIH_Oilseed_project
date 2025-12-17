# Backend API - AgriAdvisor

FastAPI backend for AI-Enabled Precision Advisory Platform

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up Database

Create a PostgreSQL database:

```sql
CREATE DATABASE agri_advisor;
```

Or use Supabase (recommended for demo).

### 3. Configure Environment

Create `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost:5432/agri_advisor
SECRET_KEY=your-secret-key-here
```

### 4. Train ML Model (Optional)

```bash
python ml/train_model.py
```

This creates trained models in `ml/models/` directory.

### 5. Run Server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server runs on `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database Models

### User
- id, email, name, phone, hashed_password
- One-to-many relationship with Fields

### Field
- id, user_id, name, area, crop_type, location, polygon
- soil_type, irrigation_type
- Relationships: NDVIData, WeatherData, SoilData, Advisory

### NDVIData
- id, field_id, date, ndvi_value, source

### WeatherData
- id, field_id, date, temperature, humidity, rainfall, wind_speed

### SoilData
- id, field_id, date, ph, nitrogen, phosphorus, potassium, organic_carbon

### Advisory
- id, field_id, date, recommendations, priority, expected_impact

## ML Pipeline

### Data Flow
1. Load CSV data (NDVI, weather, soil, yield history)
2. Preprocess and merge data
3. Extract features
4. Train Random Forest and XGBoost models
5. Save models with joblib
6. Load models for predictions

### Prediction
1. Get field features from database
2. Scale features using saved scaler
3. Make prediction with trained model
4. Calculate confidence score
5. Return prediction with factor analysis

## Sample Data

CSV files in `data/` directory:
- `fields.csv` - Field information
- `ndvi.csv` - NDVI time series
- `weather.csv` - Weather data
- `soil.csv` - Soil analysis
- `yield_history.csv` - Historical yields

## Testing

```bash
# Test with curl
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","phone":"+91 9876543210","password":"password123"}'

# Test login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Deployment

### Docker (Optional)

```dockerfile
FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables for Production
- DATABASE_URL
- SECRET_KEY (strong random string)
- CORS_ORIGINS (frontend URL)

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL format
- Ensure PostgreSQL is running
- Verify credentials

### Model Not Found
- Run `python ml/train_model.py` first
- Or use mock predictions (automatic fallback)

### CORS Error
- Update CORS origins in main.py
- Check frontend URL matches

## Performance

- Use connection pooling for database
- Cache predictions for recent queries
- Implement rate limiting
- Use async operations where possible

## Security

- JWT tokens expire after 30 minutes
- Passwords hashed with bcrypt
- SQL injection prevention via SQLAlchemy
- Input validation with Pydantic
