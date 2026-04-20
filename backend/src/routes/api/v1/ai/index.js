import { Router } from "express";
import { doubleCsrfProtection, csrfErrorHandler } from "../../../../csrf.js";
import { requireAuth } from "../../../../middleware/requireAuth.js";
import { asyncHandler } from "../../../../middleware/asyncHandler.js";
import { rewriteText } from "./handlers.js";

const router = Router();

router.post("/rewrite", doubleCsrfProtection, csrfErrorHandler, requireAuth, asyncHandler(rewriteText));

export default router;
