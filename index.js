import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

const apiKey = process.env.API_KEY;
const unit = "imperial";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Helper Function
function checkTemplateExists(filePath, res) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`Error accessing ${filePath}:`, err);
        res.status(500).send("Internal Server Error");
        reject(err);
      }
      resolve();
    });
  });
}

// Weather conditions
const weatherImages = {
  clear: "/images/sunnyWeather.jpg",
  snow: "/images/snowyWeather.jpg",
  rain: "/images/rainyWeather.jpg",
  drizzle: "/images/rainyWeather.jpg",
  clouds: "/images/cloudyWeather.jpg",
  Thunderstorm: "/images/thunderstormWeather.jpg",
};

// Function to select an image based on weather conditions
function selectImage(weatherCondition) {
  const weather = weatherCondition.toLowerCase();
  return weatherImages[weather] || "/images/default.jpg"; // Default image
}

app.get("/", async (req, res) => {
  try {
    await checkTemplateExists("views/index.ejs", res);
    res.render("index");
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/about", async (req, res) => {
  try {
    await checkTemplateExists("views/about.ejs", res);
    res.render("about");
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/news", async (req, res) => {
  try {
    await checkTemplateExists("views/news.ejs", res);
    res.render("news");
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/faqs", async (req, res) => {
  try {
    await checkTemplateExists("views/faqs.ejs", res);
    res.render("faqs");
  } catch (error) {
    console.error("Error:", error);
  }
});

app.post("/", async (req, res) => {
  try {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const day = new Date().toLocaleDateString("en-US", options);

    const query = req.body.searchTemp;

    // Get weather data from API
    const response = await fetch(
      `${API_URL}${query}&APPID=${apiKey}&units=${unit}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    // Extract weather data from response
    const weatherData = await response.json();

    // Select the image based on the weather condition
    const imagePath = selectImage(weatherData.weather[0].main);

    // Extract specific weather properties
    const {
      weather: [{ icon, description }],
      main: { temp, temp_min, temp_max, feels_like, pressure, humidity },
      wind: { speed },
      sys: { sunrise, sunset },
      coord: { lon, lat },
    } = weatherData;

    const sunRise = new Date(sunrise * 1000);
    const formattedSunRise = sunRise.toLocaleTimeString("default");

    const sunSet = new Date(sunset * 1000);
    const formattedSunSet = sunSet.toLocaleTimeString("default");

    res.render("current", {
      imagePath,
      day,
      cityName: weatherData.name,
      cityTemp: temp,
      description,
      weatherIcon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
      minTemp: temp_min,
      maxTemp: temp_max,
      tempFeels: feels_like,
      pressure,
      humidity,
      windSpeed: speed,
      formattedSunRise,
      formattedSunSet,
      lon,
      lat,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error:
        "An error occurred while fetching weather data. Please try again later or search for another city.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
