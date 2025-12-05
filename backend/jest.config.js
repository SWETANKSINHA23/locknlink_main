export default {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        'controllers/**/*.js',
        'routes/**/*.js',
        'middlewares/**/*.js',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    transform: {},
    verbose: true,
    testTimeout: 20000
};
