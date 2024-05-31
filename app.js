const configs = require('./src/configs');
const express = require('express');
const expressWinston = require('express-winston');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')
const winstonLogger = require('./src/utils/winston.util');

// routers
const userRouter = require('./src/modules/user/user.router');
const weaponRouter = require('./src/modules/weapon/weapon.router');

// middlewares
const errorHandler = require('./src/middlewares/error.middleware');

const app = express();
app.use(express.json());
app.use(expressWinston.logger({
  winstonInstance: winstonLogger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
}));

if (configs.NODE_ENV !== 'production') {
  const file = fs.readFileSync('./swagger.yaml', 'utf8')
  const swaggerDocument = YAML.parse(file)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use('/auth', userRouter);
app.use('/weapons', weaponRouter);
app.use(errorHandler);

module.exports = app;
