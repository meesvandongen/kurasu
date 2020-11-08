module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: {
        outDir: "./dist/",
        sourceMap: true,
        noImplicitAny: true,
        module: "commonjs",
        target: "es6",
        jsx: "react",
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
    },
  },
};
