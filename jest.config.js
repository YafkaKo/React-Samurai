module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',  // Используем babel-jest для обработки js файлов
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!axios)',  // Преобразуем axios через Babel
  ],
};
