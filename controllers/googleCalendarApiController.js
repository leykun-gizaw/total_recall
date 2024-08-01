const gCalService = require("../services/googleCalendarApiService");

const gCalController = {
  getEvents: async (req, res) => {
    const response = await gCalService.getEvents(req);
    res.json(response.data.items);
  },
  createEvent: async (req, res) => {
    const response = await gCalService.createEvent(req);
    res.json(response);
  },
  getDateEvent: (req, res) => {
    console.log(`Getting events of ${req.params.date}`);
  },
};

module.exports = gCalController;
