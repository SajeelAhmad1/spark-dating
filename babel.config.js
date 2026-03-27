module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: { '@': './src' },
      },
    ],
    'nativewind/babel',

    '@babel/plugin-transform-export-namespace-from',
  ],
};
