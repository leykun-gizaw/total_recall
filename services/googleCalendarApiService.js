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
  createEvent: async (req) => {
    const gcal = google.calendar({ version: "v3" });

    const event = {
      summary: "Some Event",
      description: "Some description",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(new Date().getTime() + 30 * 60 * 1000),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    try {
      const response = await gcal.events.insert({
        auth: req.session.oauth2Client,
        calendarId: "primary",
        resource: event,
      });
      console.log(`Event created, ${JSON.stringify(response.data)}`);
      return response;
    } catch (error) {
      console.log(`Error creating event, ${error}`);
    }
  },
};

module.exports = gCalService;
