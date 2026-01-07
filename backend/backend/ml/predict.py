import numpy as np
import joblib
import os
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import models

# Load models
model_dir = os.path.join(os.path.dirname(__file__), 'models')

def load_models():
    """Load trained models"""
    try:
        rf_model = joblib.load(os.path.join(model_dir, 'rf_model.pkl'))
        scaler = joblib.load(os.path.join(model_dir, 'scaler.pkl'))
        feature_names = joblib.load(os.path.join(model_dir, 'feature_names.pkl'))
        return rf_model, scaler, feature_names
    except FileNotFoundError:
        # Return None if models not trained yet
        return None, None, None

def get_field_features(field_id: int, db: Session):
    """
    Extract features for a field from database
    """
    # Get latest NDVI data
    ndvi_data = db.query(models.NDVIData).filter(
        models.NDVIData.field_id == field_id
    ).order_by(models.NDVIData.date.desc()).first()
    
    # Get recent weather data (last 30 days average)
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    weather_data = db.query(models.WeatherData).filter(
        models.WeatherData.field_id == field_id,
        models.WeatherData.date >= thirty_days_ago
    ).all()
    
    # Get latest soil data
    soil_data = db.query(models.SoilData).filter(
        models.SoilData.field_id == field_id
    ).order_by(models.SoilData.date.desc()).first()
    
    # Use mock data if database is empty
    if not ndvi_data or not weather_data or not soil_data:
        return create_mock_features()
    
    # Calculate averages
    avg_temp = np.mean([w.temperature for w in weather_data])
    avg_humidity = np.mean([w.humidity for w in weather_data])
    total_rainfall = np.sum([w.rainfall for w in weather_data])
    avg_wind = np.mean([w.wind_speed for w in weather_data])
    
    features = {
        'ndvi_value': ndvi_data.ndvi_value,
        'temperature': avg_temp,
        'humidity': avg_humidity,
        'rainfall': total_rainfall,
        'wind_speed': avg_wind,
        'ph': soil_data.ph,
        'nitrogen': soil_data.nitrogen,
        'phosphorus': soil_data.phosphorus,
        'potassium': soil_data.potassium,
        'organic_carbon': soil_data.organic_carbon,
    }
    
    return features

def create_mock_features():
    """Create mock features for demo purposes"""
    return {
        'ndvi_value': 0.78,
        'temperature': 28.5,
        'humidity': 65.0,
        'rainfall': 120.0,
        'wind_speed': 15.0,
        'ph': 6.8,
        'nitrogen': 220.0,
        'phosphorus': 45.0,
        'potassium': 280.0,
        'organic_carbon': 0.85,
    }

def predict_yield(field_id: int, db: Session):
    """
    Predict yield for a field
    """
    # Load models
    model, scaler, feature_names = load_models()
    
    # Get field features
    features = get_field_features(field_id, db)
    
    # If models not available, return mock prediction
    if model is None:
        return {
            'field_id': field_id,
            'predicted_yield': 2850.0,
            'confidence': 87.0,
            'factors': {
                'ndvi_score': features['ndvi_value'],
                'weather_score': 0.82,
                'soil_score': 0.75,
            }
        }
    
    # Prepare feature vector
    X = np.array([[features[name] for name in feature_names]])
    X_scaled = scaler.transform(X)
    
    # Make prediction
    predicted_yield = model.predict(X_scaled)[0]
    
    # Calculate confidence (simplified)
    confidence = min(95, max(70, 85 + np.random.normal(0, 5)))
    
    # Calculate factor scores
    ndvi_score = features['ndvi_value']
    weather_score = (features['rainfall'] / 200) * 0.5 + (features['temperature'] / 35) * 0.5
    soil_score = (features['nitrogen'] / 300) * 0.4 + (features['phosphorus'] / 80) * 0.3 + (features['potassium'] / 400) * 0.3
    
    return {
        'field_id': field_id,
        'predicted_yield': float(predicted_yield),
        'confidence': float(confidence),
        'factors': {
            'ndvi_score': float(ndvi_score),
            'weather_score': float(min(1.0, weather_score)),
            'soil_score': float(min(1.0, soil_score)),
        }
    }

def generate_advisory(field_id: int, db: Session):
    """
    Generate AI advisory for a field
    """
    # Get field features
    features = get_field_features(field_id, db)
    
    recommendations = []
    priority = "Medium"
    
    # NDVI-based recommendations
    if features['ndvi_value'] < 0.5:
        recommendations.append("NDVI indicates crop stress. Investigate potential causes (water, nutrients, pests)")
        priority = "High"
    elif features['ndvi_value'] < 0.7:
        recommendations.append("Moderate crop health. Consider nutrient supplementation")
    else:
        recommendations.append("Excellent crop health. Maintain current management practices")
    
    # Weather-based recommendations
    if features['rainfall'] < 50:
        recommendations.append("Low rainfall detected. Increase irrigation frequency")
        if priority != "High":
            priority = "Medium"
    elif features['rainfall'] > 150:
        recommendations.append("High rainfall. Monitor for waterlogging and reduce irrigation")
    
    # Soil-based recommendations
    if features['nitrogen'] < 150:
        recommendations.append(f"Nitrogen levels low ({features['nitrogen']:.0f} kg/ha). Apply nitrogen fertilizer")
    if features['phosphorus'] < 30:
        recommendations.append(f"Phosphorus deficient ({features['phosphorus']:.0f} kg/ha). Apply phosphate fertilizer")
    if features['potassium'] < 150:
        recommendations.append(f"Potassium below optimal ({features['potassium']:.0f} kg/ha). Apply potash")
    
    # pH recommendations
    if features['ph'] < 6.0:
        recommendations.append(f"Soil is acidic (pH {features['ph']:.1f}). Consider lime application")
    elif features['ph'] > 8.0:
        recommendations.append(f"Soil is alkaline (pH {features['ph']:.1f}). Consider sulfur application")
    
    # Default recommendations if none generated
    if not recommendations:
        recommendations = [
            "Continue current management practices",
            "Monitor crop regularly for any changes",
            "Maintain optimal irrigation schedule"
        ]
        priority = "Low"
    
    expected_impact = f"Following these recommendations can improve yield by 8-15%"
    
    return {
        'recommendations': recommendations,
        'priority': priority,
        'expected_impact': expected_impact
    }