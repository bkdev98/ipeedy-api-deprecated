/* eslint-disable no-console */

import express from 'express';
import notifier from 'node-notifier';

import constants from './config/constants';
import './config/database';
import middlewaresConfig from './config/middlewares';
import apiRoutes from './modules';
import { authenticate } from './middlewares/authenticate';

const app = express();

middlewaresConfig(app);

app.get('/', authenticate, (req, res) => {
  res.send('🐳');
});

apiRoutes(app);

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    notifier.notify({
      title: 'Ipeedy API',
      message: '🐳 Ipeedy service are ready!',
    });
    console.log(`
      🐳  Ipeedy is ready on port ${constants.PORT}

      Running on ${process.env.NODE_ENV}

      Let's create greatness 🎉
    `);
  }
});
