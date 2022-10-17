import * as express from 'express';
import * as mongoose from 'mongoose';
import * as helmet from 'helmet';
import * as xss from 'xss-clean';
import * as mongoSanitize from 'express-mongo-sanitize';
import * as compression from 'compression';
import * as cors from 'cors';
import * as passport from 'passport';
import config from './config';
import morgan from './utils/morgan';
import logger from './utils/logger';
import { jwtStrategy } from './app/user/middlewares/jwt.middleware';
import { authLimiter } from './middlewares/rate-limit.middleware';
import { notFoundErrorHandler, errorHandler } from './middlewares/error.middlware';
import routes from './routes';

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter);
}

// api routes
app.use('/api', routes);

// Serve public folder as static so we can access images
app.use(express.static('public'));
app.use(notFoundErrorHandler);
app.use(errorHandler);

let server;

mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);

      mongoose.connection.close(false, () => {
        logger.info('MongoDb connection closed');
        process.exit(1);
      });
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = error => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
    mongoose.connection.close();
  }
});
