import express, { Router } from "express";
import { WeatherService } from "../services/weatherService.js";
import { formatDate } from "../utils/dateFormatter.js";

/**
 * @file Weather routes module
 * @module routes/weatherRoutes
 * @description Defines routes for displaying the weather information, including the home page and search functionality.
 */

const router = express.Router();
const weatherService = new WeatherService();

/**
 * Route handler for the home page.
 * Renders the main page where users can search for weather data.
 *
 */
router.get("/", async (req, res) => {
  res.render("home", {
    title: "Weather Hub - Home",
    currentPage: "home",
    pageCss: "home",
  });
});

/**
 * Route handler for processing weather search requests.
 * Retrieves the weather data for a given city and renders the weather details page.
 *
 * */
router.post("/", async (req, res, next) => {
  try {
    const city = req.body.searchTemp; // Get city from the input

    // Check if the city input is empty or invalid
    if (!city || city.trim() === "") {
      return res.render("error", {
        statusCode: 400,
        error: "Please enter a city name.",
        currentPage: "error",
      });
    }

    const weatherData = await weatherService.getWeatherData(
      req.body.searchTemp
    );

    // Check if the API returned an error or no data
    if (!weatherData || weatherData.error) {
      return res.render("error", {
        statusCode: 404,
        error: `Weather information not found for "${city}". Please check the city name and try again.`,
        currentPage: "error",
      });
    }
    console.log(weatherData.imagePath);
    res.render("current", {
      title: "Weather Hub - Current",
      pageCss: "current",
      currentPage: "current",
      ...weatherData,
      day: formatDate(),
    });
  } catch (error) {
    next(error);
  }
});

export const weatherRoutes = router;
