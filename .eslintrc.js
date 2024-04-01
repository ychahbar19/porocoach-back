export default {
    env: {
        es6: true,
    },
    extends: ["plugin:@darraghor/nestjs-typed/recommended", "plugin:@darraghor/nestjs-typed/no-swagger"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: "es2019",
    },
    plugins: [
        "@darraghor/nestjs-typed"
    ],
};