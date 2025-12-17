import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib
import os
from data_processor import create_sample_data, prepare_features

def train_model():
    """
    Train yield prediction model
    """
    print("Loading and preparing data...")
    
    # Create sample data (in production, load from CSV)
    df = create_sample_data()
    
    # Prepare features
    X, y, feature_names = prepare_features(df)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print("Training Random Forest model...")
    rf_model = RandomForestRegressor(
        n_estimators=100,
        max_depth=15,
        min_samples_split=5,
        random_state=42,
        n_jobs=-1
    )
    rf_model.fit(X_train_scaled, y_train)
    
    print("Training XGBoost model...")
    xgb_model = XGBRegressor(
        n_estimators=100,
        max_depth=6,
        learning_rate=0.1,
        random_state=42
    )
    xgb_model.fit(X_train_scaled, y_train)
    
    # Evaluate models
    print("\n=== Model Evaluation ===")
    
    for name, model in [("Random Forest", rf_model), ("XGBoost", xgb_model)]:
        y_pred = model.predict(X_test_scaled)
        
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        print(f"\n{name}:")
        print(f"  RMSE: {rmse:.2f} kg/ha")
        print(f"  MAE: {mae:.2f} kg/ha")
        print(f"  R² Score: {r2:.4f}")
    
    # Save models
    model_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(model_dir, exist_ok=True)
    
    print("\nSaving models...")
    joblib.dump(rf_model, os.path.join(model_dir, 'rf_model.pkl'))
    joblib.dump(xgb_model, os.path.join(model_dir, 'xgb_model.pkl'))
    joblib.dump(scaler, os.path.join(model_dir, 'scaler.pkl'))
    joblib.dump(feature_names, os.path.join(model_dir, 'feature_names.pkl'))
    
    print("Models saved successfully!")
    
    # Feature importance
    print("\n=== Feature Importance (Random Forest) ===")
    feature_importance = pd.DataFrame({
        'feature': feature_names,
        'importance': rf_model.feature_importances_
    }).sort_values('importance', ascending=False)
    print(feature_importance)
    
    return rf_model, xgb_model, scaler

if __name__ == "__main__":
    train_model()