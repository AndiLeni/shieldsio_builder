#!/usr/bin/env node
/**
 * @fileoverview
 * Generates a MarkDown file that lists every brand name and their slug.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getIconsData, getIconSlug } from "../utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..", "..");
const slugsFile = path.resolve(rootDir, "slugs.md");

let content = "";

(async () => {
    const icons = await getIconsData();

    icons.forEach((icon) => {
        const brandName = icon.title;
        const brandSlug = getIconSlug(icon);
        content += `<option value="${brandSlug}">${brandName}</option>\n`;
    });

    await fs.writeFile(slugsFile, content);
})();
