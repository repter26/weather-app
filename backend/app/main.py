from fastapi import FastAPI, Query
from app.services import fetch_weather
from app.advisories import generate_advisory

app = FastAPI(title="Crop Advisory API")

@app.get("/advisory")
def get_advisory(
    lat: float = Query(..., description="Latitude of farm"),
    lon: float = Query(..., description="Longitude of farm"),
    crop: str = Query(..., description="Crop type (corn, soybeans, wheat)")
):
    weather_data = fetch_weather(lat, lon)
    advice = generate_advisory(weather_data, crop)
    return {
        "location": {"lat": lat, "lon": lon},
        "crop": crop,
        "advisories": advice,
        "weather_snapshot": weather_data["list"][:8]  # send a sample for frontend chart
    }
