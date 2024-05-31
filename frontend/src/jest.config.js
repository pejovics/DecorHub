module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  coverageReporters: ['html', 'lcov', 'text-summary'],
  collectCoverageFrom: ['src/app/**/*.{ts,js}', '!src/app/**/*.module.ts'],
  coverageDirectory: '<rootDir>/coverage'
};
