const { google } = require("googleapis");
const creds = require("../client_secret.json");

const oauth2Client = new google.auth.OAuth2(
  creds.web.client_id,
  creds.web.client_secret,
  creds.web.redirect_uris
);

module.exports = oauth2Client;
