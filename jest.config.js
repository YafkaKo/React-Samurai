module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios)/', // Игнорировать все node_modules, кроме axios
  ],
};