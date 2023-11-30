module.exports = {
  distDir: 'build',
  reactStrictMode: true,
  exportTrailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverRuntimeConfig: {
    secret:
      'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING',
  },
  // http://tradesapi.ibyteworkshop.com/
  env: {
    baseApiUrl: 'http://localhost:4500/',
    baseImgUrl: 'http://localhost:4500/', 
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV == 'development'
        ? 'http://localhost:4500/' // development api
        : 'http://localhost:4500/', // production api
  },
  images: {
    loader: 'imgix',
    path: 'http://localhost:4500/', // production api ,
  },
};
