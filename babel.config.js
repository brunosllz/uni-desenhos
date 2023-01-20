module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      [
        'react-native-reanimated/plugin',
        {
          globals: ['__scanCodes'],
        },
      ],
    ],
  }
}
