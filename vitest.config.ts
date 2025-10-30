import { defineConfig } from "vitest/config";
import path from "path";

const root = path.resolve(__dirname, "src");

const aliases = {
    assets: path.resolve(root, "assets"),
    components: path.resolve(root, "components"),
    decorators: path.resolve(root, "decorators"),
    HOCs: path.resolve(root, "HOCs"),
    i18n: path.resolve(root, "i18n"),
    imports: path.resolve(root, "imports"),
    stores: path.resolve(root, "stores"),
    signals: path.resolve(root, "signals"),
    types: path.resolve(root, "types"),
    utils: path.resolve(root, "utils"),
};

export default defineConfig({
    resolve: {
        alias: aliases,
    },
    test: {
        environment: "jsdom",
        alias: aliases,
    },
});
