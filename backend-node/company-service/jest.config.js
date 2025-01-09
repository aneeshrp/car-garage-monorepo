/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
};