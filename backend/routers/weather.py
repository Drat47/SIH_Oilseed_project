import httpx
from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/weather",
    tags=["weather"]
)

@router.get("/")
async def get_weather(latitude: float, longitude: float):
    try:
        url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m&timezone=auto"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            data = response.json()
            
        return {
            "temperature": data['current']['temperature_2m'],
            "humidity": data['current']['relative_humidity_2m'],
            "rain": data['current']['rain'],
            "wind_speed": data['current']['wind_speed_10m'],
            "unit_temp": data['current_units']['temperature_2m'],
            "unit_speed": data['current_units']['wind_speed_10m']
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
