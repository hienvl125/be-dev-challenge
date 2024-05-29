require('dotenv').config()
const envConfig = require('./envconfig')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// middlewares
const authMiddleware = require('./app/middlewares/auth.middleware');
// controllers
const authController = require('./app/controllers/auth.controller');

app.use(bodyParser.json());
app.post('/auth/register', authController.Register);
app.post('/auth/login', authController.Login);

app.listen(envConfig.PORT, () => {
  console.log(`Server is running on http://localhost:${envConfig.PORT}`);
});
