module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './', // @ = корень проекта
          },
        },
      ],
      'expo-router/babel',
    ],
  };
};


