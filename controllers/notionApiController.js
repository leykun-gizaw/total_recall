const notionService = require("../services/notionApiService");

const notionController = {
  getDatabases: async (req, res) => {
    const notionDatabases = await notionService.getDatabases();
    res.json(notionDatabases);
  },
  getDb: async (req, res) => {
    const db_id = req.params["database_id"];
    const db = await notionService.getDbById(db_id);

    res.json(db);
  },
  getDbPages: async (req, res) => {
    const dbPages = await notionService.getDbPages(req.params["database_id"]);
    res.json(dbPages);
  },
  getAllPages: async (req, res) => {
    res.json(await notionService.getAllDatabasePages());
  },
};

module.exports = notionController;
