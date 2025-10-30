import fs from "fs";
import path from "path";

const languages = {
    en: {
        meta: "Cloudspace - Server Management Platform",
    },
    ru: {
        meta: "Cloudspace - Платформа управления серверами",
    },
    oz: {
        meta: "Cloudspace - Serverni boshqarish platformasi",
    },
    uz: {
        meta: "Cloudspace - Серверни бошқариш платформаси",
    },
};

const buildDir = "build";
const originalHtmlPath = path.join(buildDir, "index.html");

try {
    let htmlContent = fs.readFileSync(originalHtmlPath, "utf8");

    htmlContent = htmlContent.replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
        '<meta name="description" content="__META_DESCRIPTION__">',
    );
    htmlContent = htmlContent.replace(/<html lang="[^"]*">/, '<html lang="__LANG_CODE__">');

    console.log("\nSuccessfully read the original index.html file.\n");

    for (const [langCode, { meta }] of Object.entries(languages)) {
        let newHtmlContent = htmlContent.replace("__LANG_CODE__", langCode).replace("__META_DESCRIPTION__", meta);

        const seoFolderPath = path.join(buildDir, "seo");
        fs.mkdirSync(seoFolderPath, { recursive: true });

        const newHtmlPath = path.join(seoFolderPath, `${langCode}.html`);

        fs.writeFileSync(newHtmlPath, newHtmlContent, "utf8");
        console.log(`Generated file for language: ${langCode} at ${newHtmlPath}`);
    }

    console.log("\n");
    console.table(languages);
} catch (error) {
    console.error("An error occurred during file generation:", error);
}
