def generate_advisory(weather_data, crop: str):
    advisories = []
    for entry in weather_data["list"][:8]:  # next 24 hours (3h x 8)
        temp = entry["main"]["temp"] - 273.15  # Kelvin → Celsius
        humidity = entry["main"]["humidity"]
        precipitation = entry.get("rain", {}).get("3h", 0)

        if temp > 25:
            advisories.append("High temperature expected — irrigate crops.")
        if precipitation > 5:
            advisories.append("Heavy rain forecast — apply antifungal treatment.")
        if humidity > 80:
            advisories.append("High humidity — monitor crops for fungal diseases.")

    # Crop-specific rules
    if crop == "corn":
        advisories.append("Corn requires consistent soil moisture — irrigate if dry.")
    elif crop == "soybeans":
        advisories.append("Soybeans are sensitive to waterlogging — monitor drainage.")
    elif crop == "wheat":
        advisories.append("Wheat prefers cooler weather — consider adjusting sowing times.")

    return list(set(advisories))  # remove duplicates
