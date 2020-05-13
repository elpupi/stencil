// /(?!(something)/) means will not match something
module.exports = {
    ...require('./jest-config/jest-common.config'),
    testPathIgnorePatterns: ['/node_modules', 'src/components'],
    testRegex: `\\.spec\\.ts$`
};
