const express = require("express");
const notionController = require("../controllers/notionApiController");

const router = express.Router();

router.get("/databases", notionController.getDatabases);
router.get("/pages/:database_id", notionController.getDbPages);
router.get("/allpages", notionController.getAllPages);

module.exports = router;
