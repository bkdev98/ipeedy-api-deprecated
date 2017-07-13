import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      🐳  Ipeedy is ready on port ${PORT}

      Running on ${process.env.NODE_ENV}

      Let's create greatness 🎉
    `)
  }
});
