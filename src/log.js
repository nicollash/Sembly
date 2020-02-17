import * as Sentry from '@sentry/react-native';

// eslint-disable-next-line no-undef
if (!__DEV__) {
  Sentry.init({
    dsn: 'https://03df0cda3fec4a1c8d41dcfc22f923a3@sentry.io/2525582', 
  });
}
