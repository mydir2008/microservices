module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'jsx', 'json'],
    rootDir: __dirname,
    testMatch: ['<rootDir>/src/**/*.test.js','<rootDir>/src/**/test.js'],
    transform: {
      '^.+\\.js?$': 'babel-7-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleNameMapper: {}
  }