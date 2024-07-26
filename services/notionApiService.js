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

  getDbPages: async (dbId) => {
    const notionResponse = await notion.databases.query({
      database_id: dbId,
    });
    return notionResponse.results;
  },
};

module.exports = notionService;
