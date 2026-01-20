from fastapi import APIRouter
import random

router = APIRouter(
    prefix="/market",
    tags=["market"]
)

@router.get("/prices")
def get_market_prices():
    # Mock data for Indian Mandis
    crops = ["Soybean", "Groundnut", "Mustard", "Sunflower", "Cotton"]
    prices = []
    
    for crop in crops:
        # Generate random price variation
        base_price = 4000 if crop == "Soybean" else 5500 if crop == "Groundnut" else 3500
        variation = random.randint(-200, 200)
        current_price = base_price + variation
        trend = "up" if variation > 0 else "down"
        
        prices.append({
            "crop": crop,
            "price": current_price,
            "trend": trend,
            "change": abs(variation)
        })
        
    return prices
