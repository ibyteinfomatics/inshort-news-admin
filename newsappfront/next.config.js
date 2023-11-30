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
    baseApiUrl: 'https://news-api-up0y.onrender.com/',
    baseImgUrl: 'https://news-api-up0y.onrender.com/', 
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV == 'development'
        ? 'https://news-api-up0y.onrender.com/' // development api
        : 'https://news-api-up0y.onrender.com/', // production api
  },
  images: {
    loader: 'imgix',
    path: 'https://news-api-up0y.onrender.com/', // production api ,
  },
};
