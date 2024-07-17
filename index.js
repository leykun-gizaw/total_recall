/**
 * Purpose of this module is to query all pages in databases the app has access
 * to.
 */

require("dotenv").config();
const { Client, isFullPage } = require("@notionhq/client");

// Initializing a client
const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function getAllDatabases() {
  const searchResult = await notion.search({
    query: "",
    filter: { value: "database", property: "object" },
  });

  return searchResult.results;
}

const database = getAllDatabases().then((databases) => {
  for (const db of databases) {
    const pages = notion.databases.query({
      database_id: db.id,
    });
    pages.then((result) => {
      for (const page of result.results) {
        console.log(
          page.properties["Question Titles"].title[0]["plain_text"],
          page.properties["Revision Date"].date.start.split("T")[0]
        );
      }
    });
  }
});
