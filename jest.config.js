const { defaults } = require('jest-config')

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'js', 'json'],
  collectCoverage: false,
  collectCoverageFrom: ['**/*.{js}', '!**/node_modules/**'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  // setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'node',
  verbose: true
}
