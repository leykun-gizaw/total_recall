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
  getTodayEvents: async (req, res) => {
    const response = await gCalService.getTodayEvents(req);
    res.send(response);
  },
  getEventById: async (req, res) => {
    const event = await gCalService.getEventById(req, req.params.eventId);
    if (event) {
      res.send(event);
    } else {
      res.status(404).send("Event not found");
    }
  },
};

module.exports = gCalController;
