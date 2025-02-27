import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { weatherRoutes } from "./src/routes/weatherRoutes.js";
import { pageRoutes } from "./src/routes/pageRoutes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { requestLogger } from "./src/middleware/requestLogger.js";
import { config } from "./src/config/config.js";
import expressLayouts from "express-ejs-layouts";

const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "data:", "https://openweathermap.org"],
        fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
        scriptSrcElem: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrcElem: ["'self'", "https://cdn.jsdelivr.net"],
      },
    },
  })
);

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(requestLogger);

// View engine
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(expressLayouts);

// Routes
app.use("/", weatherRoutes);
app.use("/", pageRoutes);

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;
