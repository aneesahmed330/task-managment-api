import helmet from 'helmet';
import compression from 'compression';
import httpStatus from 'http-status';
import mongoSanitize from 'express-mongo-sanitize';
import express, { Request, Response, NextFunction, Express } from 'express';
import routes from './routes';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';

// create app
const app: Express = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

app.use(mongoSanitize());

// gzip compression
app.use(compression());

// v1 api routes
app.use('/api/v1', routes);

// handle
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error 404
app.use(errorHandler);

export default app;
