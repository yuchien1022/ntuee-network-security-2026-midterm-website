import path from "path";
import { fileURLToPath } from "url";

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const uploadsDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.resolve(backendRoot, "uploads");

export const frontendDistDir = path.resolve(backendRoot, "../frontend/dist");

// Render note:
// - Mount a persistent disk at /var/data
// - Set UPLOAD_DIR=/var/data/uploads
// - Only files under the mounted disk path persist across restarts/redeploys
