import dotenv from "dotenv";

/**
 * @file Configuration module
 * @module config
 * @description Loads environment variables and defines application-wide configuration settings.
 *
 * This module reads environment variables using dotenv and provides configuration settings
 * such as the server port, API key, weather API URL, units of measurement, and image mappings
 * for different weather conditions.
 */
dotenv.config();
export const config = {
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  apiUrl: "https://api.openweathermap.org/data/2.5/weather",
  unit: "imperial",
  weatherImages: {
    clear: "/images/sunnyWeather.jpg",
    snow: "/images/snowyWeather.jpg",
    rain: "/images/rainyWeather.jpg",
    drizzle: "/images/rainyWeather.jpg",
    clouds: "/images/cloudyWeather.jpg",
    thunderstorm: "/images/thunderstormWeather.jpg",
    default: "/images/default.jpg",
  },
};
