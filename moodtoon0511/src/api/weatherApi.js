export const getWeather = async () => {
  const latitude = 37.5665;
  const longitude = 126.9780;

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      "날씨 API 오류:",
      error
    );
  }
};