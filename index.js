/**
 * Purpose of this module is to query all pages in databases the app has access
 * to.
 */

const dotenv = require("dotenv");
const { Client, isFullPage } = require("@notionhq/client");
const express = require("express");

// Load environment variables from file
dotenv.config();
// Initializing a client
const notion = new Client({ auth: process.env.NOTION_TOKEN });
// Create an express app
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.get("/db_pages", async (req, res) => {
  const allDatabases = await getAllDatabases();
  const allPages = [];

  for (const db of allDatabases) {
    const dbPages = await notion.databases.query({
      database_id: db.id,
    });
    for (const page of dbPages.results) {
      allPages.push(page);
    }
  }

  res.json(allPages);
});

async function getAllDatabases() {
  const searchResult = await notion.search({
    query: "",
    filter: { value: "database", property: "object" },
  });

  return searchResult.results;
}

app.listen(8080, () => {
  console.log("App listening on port 8080");
});
