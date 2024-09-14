const { google } = require("googleapis");
const moment = require("moment-timezone");

const gCal = google.calendar({ version: "v3" });

const gCalService = {
  getEvents: (req) => {
    return gCal.events.list({
      calendarId: "primary",
      auth: req.session.oauth2Client,
    });
  },
  getEventById: async (req, eventId) => {
    try {
      const event = await gCal.events.get({
        auth: req.session.oauth2Client,
        calendarId: "primary",
        eventId,
      });
      return event;
    } catch (error) {
      console.log("Error retrieving event");
    }
  },
  getTodayEvents: async (req) => {
    const startDate = moment
      .tz("Africa/Addis_Ababa")
      .startOf("D")
      .toISOString();
    const endDate = moment.tz("Africa/Addis_Ababa").endOf("D").toISOString();

    const todayEvents = await gCal.events.list({
      calendarId: "primary",
      auth: req.session.oauth2Client,
      timeMin: startDate,
      timeMax: endDate,
    });

    return todayEvents;
  },
  createEvent: async (req) => {
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
      const response = await gCal.events.insert({
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
