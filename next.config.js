module.exports = {
  webpack: (config) => {
    /* eslint-disable no-param-reassign */
    config.node = {
      fs: 'empty',
    };
    /* eslint-enable no-param-reassign */
    return config;
  },
};
