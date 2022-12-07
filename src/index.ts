import { createServer, Server } from 'http';
import mongoose from 'mongoose';
import config from './config/config';
import app from './app';

const servers = createServer(app);
let server: Server;

mongoose?.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log('connected to the database..');
  server = servers.listen(config.port, () => {
    console.log(`Server is listening on the port: ${config.port}`);
  });
});

const exitHandler = (): void => {
  if (server) {
    server.close(() => {
      console.log('Server closed ');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
