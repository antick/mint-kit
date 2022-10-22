module.exports = {
  coveragePathIgnorePatterns: ['node_modules', 'src/assets', '__tests__', '.history'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  coverageThreshold: {
    global: {
      statements: 55.79,
      branches: 45.45,
      functions: 44.37,
      lines: 56.26
    }
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['cypress', '.history'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.svg$': 'svg-jest',
    '.+\\.(css|less|sass|scss)$': 'jest-css-modules-transform'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-images-upload).+\\.js$'
  ]
};
