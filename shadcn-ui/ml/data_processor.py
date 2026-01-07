import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def load_and_process_data():
    """
    Load and process training data from CSV files
    """
    # Load data
    ndvi_df = pd.read_csv('../data/ndvi.csv')
    weather_df = pd.read_csv('../data/weather.csv')
    soil_df = pd.read_csv('../data/soil.csv')
    yield_df = pd.read_csv('../data/yield_history.csv')
    
    # Convert dates
    ndvi_df['date'] = pd.to_datetime(ndvi_df['date'])
    weather_df['date'] = pd.to_datetime(weather_df['date'])
    
    # Aggregate NDVI by field and month
    ndvi_df['month'] = ndvi_df['date'].dt.to_period('M')
    ndvi_agg = ndvi_df.groupby(['field_id', 'month'])['ndvi_value'].mean().reset_index()
    
    # Aggregate weather by field and month
    weather_df['month'] = weather_df['date'].dt.to_period('M')
    weather_agg = weather_df.groupby(['field_id', 'month']).agg({
        'temperature': 'mean',
        'humidity': 'mean',
        'rainfall': 'sum',
        'wind_speed': 'mean'
    }).reset_index()
    
    # Merge data
    merged_df = ndvi_agg.merge(weather_agg, on=['field_id', 'month'], how='inner')
    merged_df = merged_df.merge(soil_df, on='field_id', how='inner')
    merged_df = merged_df.merge(yield_df, on='field_id', how='inner')
    
    return merged_df

def prepare_features(df):
    """
    Prepare feature matrix and target variable
    """
    feature_columns = [
        'ndvi_value', 'temperature', 'humidity', 'rainfall', 
        'wind_speed', 'ph', 'nitrogen', 'phosphorus', 'potassium', 
        'organic_carbon'
    ]
    
    X = df[feature_columns].values
    y = df['yield_kg_per_ha'].values
    
    return X, y, feature_columns

def create_sample_data():
    """
    Create sample training data if CSV files don't exist
    """
    np.random.seed(42)
    n_samples = 500
    
    # Generate synthetic data
    data = {
        'ndvi_value': np.random.uniform(0.3, 0.9, n_samples),
        'temperature': np.random.uniform(20, 35, n_samples),
        'humidity': np.random.uniform(40, 90, n_samples),
        'rainfall': np.random.uniform(0, 200, n_samples),
        'wind_speed': np.random.uniform(5, 25, n_samples),
        'ph': np.random.uniform(5.5, 8.0, n_samples),
        'nitrogen': np.random.uniform(100, 300, n_samples),
        'phosphorus': np.random.uniform(20, 80, n_samples),
        'potassium': np.random.uniform(100, 400, n_samples),
        'organic_carbon': np.random.uniform(0.3, 1.5, n_samples),
    }
    
    # Create target variable with some correlation to features
    yield_base = 2000
    yield_var = (
        data['ndvi_value'] * 1000 +
        data['rainfall'] * 2 +
        data['nitrogen'] * 1.5 +
        data['phosphorus'] * 3 +
        data['potassium'] * 0.5 +
        np.random.normal(0, 200, n_samples)
    )
    
    data['yield_kg_per_ha'] = yield_base + yield_var
    
    return pd.DataFrame(data)