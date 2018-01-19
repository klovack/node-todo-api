const conf = require('./config.json');

const env = process.env.NODE_ENV || 'development';

console.log(`******************* env = ${env} *******************`);

if (env === 'development' || env === 'test') {
  const envConf = conf[env];

  Object.keys(envConf).forEach((key) => {
    process.env[key] = envConf[key];
  });
}
