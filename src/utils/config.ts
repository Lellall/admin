const config = {
  development: {
    BACKEND_URL: "https://api.lellall.com",
  },
  production: {
    BACKEND_URL: "https://api.lellall.com",
  },
}

const currentEnv = process.env.NODE_ENV || "development"

export const configUrl = config[currentEnv as "development" | "production"]

// https://api.dev.lellall.com/backend-core/
