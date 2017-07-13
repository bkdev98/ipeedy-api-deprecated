import config from './config';

const devConfig = {
  MONGO_URL: config.MongoDevUrl,
};

const testConfig = {
  MONGO_URL: config.MongoTestUrl,
};

const prodConfig = {
  MONGO_URL: config.MongoProdUrl,
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  ESMS_API_URL: config.EsmsApiUrl,
  ESMS_API_KEY: config.EsmsApiKey,
  ESMS_SECRET_KEY: config.EsmsSecretKey,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
}
