import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  restoreMocks: true,
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  testRegex: '((\\.|/*.)(test))\\.js?$'
};
