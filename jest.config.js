module.exports = {
    // 是否需要自动mock模块
    automock: false,
    preset: '@vue/cli-plugin-unit-jest',
    moduleFileExtensions: [
        'js',
        'vue',
        'ts',
        'json'
    ],
    transform: {
        '^.+\\.vue$': '<rootDir>/node_modules/vue-jest',
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.tsx?$':'<rootDir>/node_modules/ts-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    // 测试文件的格式
    // testMatch: [
    //   "**/__tests__/**/*.[jt]s?(x)",
    //   "**/?(*.)+(spec|test).[tj]s?(x)"
    // ],
    testRegex: '(**/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transformIgnorePatterns: ['<rootDir>/node_modules/']
}
