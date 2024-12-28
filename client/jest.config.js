const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/(.*)$': '<rootDir>/app/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
     "app/[locale]/add_listing/**/*.{js,jsx,ts,tsx}"
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    '.next',
    'test-utils',
    'jest.setup.js',
    'jest.config.js'
  ],
  coverageReporters: ['text', 'lcov', 'html', 'text-summary']
};

module.exports = createJestConfig(customJestConfig);