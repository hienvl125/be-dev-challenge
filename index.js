require('dotenv').config()
const envConfig = require('./envconfig')
const expressWinston = require('express-winston');
const winstonLogger = require('./app/utils/winston.util');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// middlewares
const authMiddleware = require('./app/middlewares/auth.middleware');
const { errorCatcher, errorHandler } = require('./app/middlewares/error.middleware');
// controllers
const authController = require('./app/controllers/auth.controller');

app.use(bodyParser.json());
app.use(expressWinston.logger({
  winstonInstance: winstonLogger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
}));
app.post('/auth/register', errorCatcher(authController.Register));
app.post('/auth/login', errorCatcher(authController.Login));

// error handling
app.use(errorHandler);
app.listen(envConfig.PORT, () => {
  console.log(`Server is running on http://localhost:${envConfig.PORT}`);
});
