from fastapi import FastAPI, Query
from app.services import fetch_weather
from app.advisories import generate_advisory


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Crop Advisory API")

origins = [
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,    
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],   
)


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
        "weather_snapshot": weather_data["list"][:8] 
    }
