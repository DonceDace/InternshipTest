module.exports = {
  setupFiles: [require.resolve('./tests/setup')],
  moduleNameMapper: {
    '\\.(css|less|sass|scss|stylus)$': require.resolve('identity-obj-proxy'),
    '^@/(.*)': '<rootDir>/src/$1'
  },
  globals: {
    SERVER_ENV: 'development'
  },
  collectCoverageFrom: ['src/**/*.(js|jsx|ts|tsx)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/public/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/.umi',
    '<rootDir>/src/.umi-production'
  ]
};
