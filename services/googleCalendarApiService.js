const { google } = require("googleapis");

const gCalService = {
  getEvents: (req) => {
    const gcal = google.calendar({
      version: "v3",
      auth: req.session.oauth2Client,
    });
    return gcal.events.list({
      calendarId: "primary",
    });
  },
};

module.exports = gCalService;
