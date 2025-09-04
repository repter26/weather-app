import requests
from app.config import OPENWEATHER_API_KEY, OPENWEATHER_URL

def fetch_weather(lat: float, lon: float):
    params = {
        "lat": lat,
        "lon": lon,
        "appid": OPENWEATHER_API_KEY
    }
    response = requests.get(OPENWEATHER_URL, params=params)
    response.raise_for_status()
    return response.json()
