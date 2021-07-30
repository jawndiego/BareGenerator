module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-custom-media': {
      importFrom: [
        () => {
          const { screens } = require('./globals.json');
          const customMedia = {};
          /* eslint-disable no-restricted-syntax, guard-for-in */
          for (const size in screens) {
            customMedia[`--${size}`] = `(min-width: ${screens[size]}px)`;
          }
          /* eslint-enable no-restricted-syntax, guard-for-in */
          customMedia['--portrait'] = `(max-width: ${screens.lg - 1}px)`;
          customMedia['--mobile'] = `(max-width: ${screens.md - 1}px)`;
          customMedia['--hover'] = '(hover:hover)';
          return { customMedia };
        },
      ],
    },
  },
};
