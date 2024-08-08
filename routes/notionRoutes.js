const express = require("express");
const notionController = require("../controllers/notionApiController");

const router = express.Router();

router.get("/databases", notionController.getDatabases);
router.get("/databases/:database_id/pages", notionController.getDbPages);
router.get("/databases/:database_id", notionController.getDb);
router.get("/allpages", notionController.getAllPages);
router.get("/pages/:page_id", notionController.getPage);

module.exports = router;
