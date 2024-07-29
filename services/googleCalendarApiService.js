const { google } = require("googleapis");
const crypto = require("crypto");
const credentials = require("../client_secret.json");

const oauth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris
);
const state = crypto.randomBytes(32).toString("hex");

const gCalService = {
  getAuthUrl: () => {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar"],
      include_granted_scopes: true,
      state: state,
    });

    return authorizationUrl;
  },
  getEvents: () => {
    const gcal = google.calendar({ version: "v3", auth: oauth2Client });
    return gcal.events.list({
      calendarId: "primary",
    });
  },
  state,
  oauth2Client,
};

module.exports = gCalService;
