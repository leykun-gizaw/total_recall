const gCalService = require("../services/googleCalendarApiService");

const gCalController = {
  getEvents: async (req, res) => {
    console.log("Getting calendar events");
    const response = await gCalService.getEvents(req);
    for (ev of response.data.items) {
      console.log(ev);
    }
    res.send("<h1>Logged events to console</h1>");
  },
  createEvent: (req, res) => {
    console.log(
      `Creating calendar event ${req.body.eventName} @ ${req.body.time} for ${req.body.duration} minutes`
    );
  },
  getDateEvent: (req, res) => {
    console.log(`Getting events of ${req.params.date}`);
  },
};

module.exports = gCalController;
