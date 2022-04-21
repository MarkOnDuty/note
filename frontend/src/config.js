const config = {
  SENTRY_DSN: "https://c34080942fd042d39e7cff3ffa95ea05@o1189108.ingest.sentry.io/6354717",
  STRIPE_KEY: "pk_test_51KemB6L3max4h1ltuwyQVrUQCGxJeGMh77IyPvui1jmqieGbFV7zuC60lsE3UMb4FekDTyw75qmvnmziQwLKPK0X00180mJDXf",
  // Backend config
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: process.env.REACT_APP_REGION,
    BUCKET: process.env.REACT_APP_BUCKET,
  },
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    URL: process.env.REACT_APP_API_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
};

export default config;
