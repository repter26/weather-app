def generate_advisory(weather_data, crop: str):
    advisories = []

    for entry in weather_data["list"][:8]: 
        temp = entry["main"]["temp"] - 273.15 
        humidity = entry["main"]["humidity"]
        precipitation = entry.get("rain", {}).get("3h", 0)

        if temp > 30:
            advisories.append("Very high temperature expected — irrigate crops to reduce stress.")
        elif temp < 10:
            advisories.append("Low temperatures forecast — protect sensitive crops from cold stress.")

        if precipitation > 10:
            advisories.append("Heavy rainfall expected — ensure proper drainage and protect against waterlogging.")
        elif 2 < precipitation <= 10:
            advisories.append("Moderate rain forecast — reduce irrigation schedules accordingly.")

        if humidity > 85:
            advisories.append("High humidity — monitor crops closely for fungal or bacterial diseases.")
        elif humidity < 30:
            advisories.append("Low humidity — consider mulching to retain soil moisture.")


    crop = crop.lower()
    if crop == "corn":
        advisories.append("Corn requires consistent soil moisture — irrigate regularly if dry conditions persist.")
        advisories.append("High heat during pollination may reduce yields — ensure adequate water supply.")

    elif crop == "wheat":
        advisories.append("Wheat prefers cooler temperatures — avoid late sowing in hot regions.")
        advisories.append("Monitor for rust diseases in humid or rainy weather.")

    elif crop == "rice":
        advisories.append("Rice thrives in standing water — ensure fields remain flooded if rainfall is low.")
        advisories.append("Excessive rainfall can cause lodging — monitor water levels.")

    elif crop == "soybeans":
        advisories.append("Soybeans are sensitive to waterlogging — ensure proper drainage during heavy rain.")
        advisories.append("High humidity may promote soybean rust — scout fields frequently.")

    elif crop == "chickpeas":
        advisories.append("Chickpeas are drought-tolerant — avoid over-irrigation.")
        advisories.append("High humidity increases risk of Ascochyta blight — consider preventive fungicides.")

    elif crop == "tomatoes":
        advisories.append("Tomatoes are highly sensitive to fungal diseases in wet, humid conditions — ensure good airflow.")
        advisories.append("Extreme heat (>35°C) may cause blossom drop — provide shade if possible.")

    elif crop == "potatoes":
        advisories.append("Potatoes are prone to late blight in cool, wet weather — apply protective fungicides.")
        advisories.append("Avoid waterlogging — ensure soil drains well after rainfall.")

    elif crop == "cotton":
        advisories.append("Cotton requires warm weather — protect seedlings from cold snaps.")
        advisories.append("High humidity can favor boll rot — maintain field sanitation.")

    elif crop == "coffee":
        advisories.append("Coffee plants are sensitive to frost — provide cover during cold nights.")
        advisories.append("Excessive rain can increase coffee leaf rust — monitor foliage closely.")

    return list(set(advisories))
