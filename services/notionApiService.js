const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const notionService = {
  getDatabases: async () => {
    const search = await notion.search({
      query: "",
      filter: { value: "database", property: "object" },
    });

    return search.results;
  },
  getDbById: async (db_id) => {
    const db = await notion.databases.retrieve({ database_id: db_id });
    return db;
  },
  getDbPages: async (dbId) => {
    const notionResponse = await notion.databases.query({
      database_id: dbId,
    });
    return notionResponse.results;
  },
  getAllDatabasePages: async function () {
    const allPages = [];
    const allDatabases = await this.getDatabases();

    for (db of allDatabases) {
      let pages = await this.getDbPages(db.id);
      allPages.push(...pages);
    }

    return allPages;
  },
};

module.exports = notionService;
