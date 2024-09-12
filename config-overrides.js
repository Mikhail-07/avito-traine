const path = require('path');
const { override, addLessLoader } = require('customize-cra');
const postcssPresetEnv = require('postcss-preset-env'); 

module.exports = override(
  // Настройка alias
  (config) => {
    config.resolve.alias = {
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@api': path.resolve(__dirname, 'src/api'),
    };
    return config;
  },

  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  }),

  // Настройка PostCSS с использованием postcssOptions
  (config) => {
    const oneOfRule = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;

    oneOfRule.forEach((rule) => {
      if (rule.use) {
        rule.use.forEach((useLoader) => {
          if (useLoader.loader && useLoader.loader.includes('postcss-loader')) {
            useLoader.options = {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({
                    stage: 0,
                  }),
                ],
              },
            };
          }
        });
      }
    });

    return config;
  }
);
