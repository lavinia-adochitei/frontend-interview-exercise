// jest.config.js
// const nextJest = require('next/jest');
//
// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: './',
// });

const customConfig = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  // moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^~components/(.*)$': '<rootDir>/src/components/$1',
    '^~components': '<rootDir>/src/components/index.ts',
    '^~mocks/(.*)$': '<rootDir>/src/mocks/$1',
    '^~mocks': '<rootDir>/src/mocks/index.ts',
    '^~types/(.*)$': '<rootDir>/src/types/$1',
    '^~types': '<rootDir>/src/types/index.ts',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = customConfig;
