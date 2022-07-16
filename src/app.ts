import dotenv from "dotenv";

dotenv.config();

import fs from "fs";
import path from "path";
import { storage } from "./storage";

const filename = "kAyGm9o.jpeg";
const fullPath = path.resolve('assets', filename);
const buffer = fs.readFileSync(fullPath);

(async () => {
  try {
    const fileUploaded = await storage.upload(filename, buffer);
    const fileData = await storage.fetchFile(filename);

    console.log({ fileUploaded, fileData })
  } catch (err) {
    console.error(err);
  }
})();
