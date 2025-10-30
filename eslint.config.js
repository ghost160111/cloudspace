import mobxDecoratorRule from "./eslint-rules/mobx-decorator-rule.js";
import mobxObserverRule from "./eslint-rules/mobx-observer-rule.js";

export default [
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parser: (await import("@typescript-eslint/parser")).default,
            parserOptions: {
                ecmaFeatures: { jsx: true },
                project: null,
            },
        },
        plugins: {
            custom: {
                rules: {
                    "mobx-observer-rule": mobxObserverRule,
                    "mobx-decorator-rule": mobxDecoratorRule,
                },
            },
        },
        rules: {
            "custom/mobx-observer-rule": "warn",
            "custom/mobx-decorator-rule": "warn",
        },
    },
];
