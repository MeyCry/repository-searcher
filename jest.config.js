// require('jest-fetch-mock').enableMocks();

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    "moduleNameMapper": {
        "\\.(css|scss)$": "<rootDir>/src/ts/__mocks__/styleMock.js"
    }
};
