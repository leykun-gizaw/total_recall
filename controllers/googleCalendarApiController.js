const gCalService = require("../services/googleCalendarApiService");

const gCalController = {
  getEvents: async (req, res) => {
    const response = await gCalService.getEvents(req);
    res.json(response.data.items);
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
