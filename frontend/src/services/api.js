async function getWeatherData() {
  const res = await fetch(
    `http://127.0.0.1:8000/advisory?lat=${center.lat}&lon=${center.lng}&crop=${selected}`
  );
  const data = await res.json();
  console.log(data);
}
