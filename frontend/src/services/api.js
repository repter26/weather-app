async function getWeatherData(center, selected) {
  const res = await fetch(
    `http://127.0.0.1:8000/advisory?lat=${center.lat}&lon=${center.lng}&crop=${selected}`
  );
  const data = await res.json();
  return data;
}

export default getWeatherData;
