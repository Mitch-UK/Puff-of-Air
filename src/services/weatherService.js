import axios from "axios";
import { config } from "../config/config.js";
import { validateApiKey, validateSearchQuery } from "../utils/validators.js";
import { formatTime } from "../utils/dateFormatter.js";

/**
 * @file Weather service utilities
 * @module services/weatherService
 * @description Provides functionality for interacting with the weather API to fetch weather data.
 *
 * The `WeatherService` class contains methods to retrieve weather data for a given city name.
 * It uses Axios to communicate with the weather API and provides error handling and validation.
 *
 * This service is responsible for handling weather-related data requests
 * to the weather API. It uses Axios for HTTP requests and includes methods
 * for retrieving current weather data based on a city name.
 *
 * @class WeatherService
 */

export class WeatherService {
  constructor() {
    this.apiKey = config.apiKey;
    this.apiUrl = config.apiUrl;
    this.unit = config.unit;

    // Initialize axios instance with default config
    this.client = axios.create({
      baseURL: this.apiUrl,
      timeout: 5000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Retrieves weather data for a specific city.
   */
  async getWeatherData(query) {
    try {
      // Validate inputs
      validateApiKey(this.apiKey);
      const validatedQuery = validateSearchQuery(query);

      // Make the API request
      const response = await this.client.get("", {
        params: {
          q: validatedQuery,
          appid: this.apiKey,
          units: this.unit,
        },
      });

      return this.transformWeatherData(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error("City not found");
      }
      throw new Error("Failed to fetch weather data. Please try again later.");
    }
  }

  /**
   * Transforms raw weather data into a more usable format.
   */
  transformWeatherData(data) {
    try {
      const {
        weather: [{ icon, description }],
        main: { temp, temp_min, temp_max, feels_like, pressure, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
        coord: { lon, lat },
        name,
      } = data;

      return {
        cityName: name,
        cityTemp: Math.round(temp),
        description: this.capitalizeDescription(description),
        weatherIcon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
        minTemp: Math.round(temp_min),
        maxTemp: Math.round(temp_max),
        tempFeels: Math.round(feels_like),
        pressure,
        humidity,
        windSpeed: Math.round(speed),
        sunrise: formatTime(sunrise),
        sunset: formatTime(sunset),
        lon: lon.toFixed(2),
        lat: lat.toFixed(2),
        imagePath: this.selectWeatherImage(data.weather[0].main),
      };
    } catch (error) {
      console.error(
        "Error transforming weather data:",
        error,
        "Raw data:",
        data
      );
      throw new Error("Error processing weather data");
    }
  }

  /**
   * Capitalizes the first letter of each word in the weather description.
   */
  capitalizeDescription(description) {
    return description
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  /**
   * Selects an appropriate weather image based on the weather condition.
   */
  selectWeatherImage(condition) {
    return (
      config.weatherImages[condition.toLowerCase()] ||
      config.weatherImages.default
    );
  }
}
