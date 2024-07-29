const gCalService = require("../services/googleCalendarApiService");
const url = require("url");

const gCalController = {
  authorize: (req, res) => {
    req.session.state = gCalService.state;
    res.redirect(gCalService.getAuthUrl());
  },
  oauth2callback: async (req, res) => {
    let q = url.parse(req.url, true).query;

    if (q.error) {
      console.log("Error" + q.error);
    } else if (q.state !== req.session.state) {
      console.log("State mismatch");
    } else {
      let { tokens } = await gCalService.oauth2Client.getToken(q.code);
      req.session.credentials = gCalService.oauth2Client.setCredentials(tokens);
      res.send("<h1>Authorized</h1>");
    }
  },
  getEvents: async (req, res) => {
    console.log("Getting calendar events");
    const response = await gCalService.getEvents();
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
