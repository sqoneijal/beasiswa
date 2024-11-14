import fse from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Dapatkan __dirname menggunakan fileURLToPath dan import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const topDir = __dirname;
fse.emptyDirSync(path.join(topDir, "assets", "tinymce"));
fse.copySync(path.join(topDir, "node_modules", "tinymce"), path.join(topDir, "assets", "tinymce"), { overwrite: true });
