export const environment = {
  googleOAuth2: {
    clientId: process.env.VUE_APP_GOOGLE_OAUTH2_CLIENT_ID!,
    clientSecret: process.env.VUE_APP_GOOGLE_OAUTH2_CLIENT_SECRET!,
    scopes: [process.env.VUE_APP_GOOGLE_OAUTH2_SCOPES!],
  },
  sentry: {
    dsn: process.env.VUE_APP_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  },
  analytics: {
    accountId: process.env.VUE_APP_ANALYTICS_ACCOUNT_ID!,
  },
};
