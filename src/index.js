/* eslint-disable no-console */

import express from 'express';

import constants from './config/constants';
import './config/database';

const app = express();

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      🐳  Ipeedy is ready on port ${constants.PORT}

      Running on ${process.env.NODE_ENV}

      Let's create greatness 🎉
    `);
  }
});
