//@ts-nocheck
const config = {
  development: {
    BACKEND_URL: 'https://api.dev.lellall.com',
  },
  production: {
    BACKEND_URL: 'https://api.lellall.com',
  },
};

const currentEnv = process.env.NODE_ENV || 'development';

export const BACKEND_URL = config[currentEnv].BACKEND_URL;
// export const BACKEND_URL = (config as { [key: string]: { BACKEND_URL: string } })[currentEnv].BACKEND_URL;
