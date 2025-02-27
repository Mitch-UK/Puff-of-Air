# Puff-of-Air

# 🌤️ Overview

Puff-of-Air is a dynamic web application that provides real-time weather updates, news, and frequently asked questions (FAQs) about weather-related topics. Built with **Node.js**, **Express**, and **EJS**, the app fetches weather data from the OpenWeather API and presents it in a user-friendly interface.

# 🚀 Features

- 🌎 **Search Weather by City** – Get the latest weather updates for any city.
- 🌡️ **Temperature, Humidity & Wind Details** – Comprehensive weather information.
- 📰 **Latest Weather News** – Stay informed with current weather-related news.
- ❓ **FAQs Section** – Commonly asked questions about weather.
- 🎨 **Responsive UI** – Styled using Bootstrap for a clean and mobile-friendly design.
- 🛡️ **Security Features** – Uses Helmet.js for Content Security Policy.

# 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Bootstrap
- **API:** OpenWeather API
- **Security:** Helmet.js

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```sh
git clone https://github.com/Alzubi-Omar/Puff-of-Air.git
cd weather-hub
```

## 2️⃣ Install Dependencies

```sh
npm install
```

## 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add your API key:

```env
OPENWEATHER_API_KEY=your_api_key_here
PORT=3000
```

## 4️⃣ Start the Server

```sh
npm start
```

The app will be running at `http://localhost:3000`

## 🖥️ Usage

- Navigate to `http://localhost:3000`
- Enter a city name in the search box to fetch weather details.
- Browse the news and FAQs sections.

## 🔐 Security Features

- **Helmet.js** – Adds security headers to protect against common web vulnerabilities.
- **Input Validation** – Ensures only valid search queries are accepted.

## 📌 Future Enhancements

- 🌍 **Multi-language support**
- 📅 **5-day weather forecast**
- 📍 **Geolocation-based weather updates**
- 📊 **Weather data visualization with charts**

## 📝 License

This project is licensed under the MIT License.

---

💡 **Have feedback or want to contribute?** Feel free to submit an issue or pull request!
