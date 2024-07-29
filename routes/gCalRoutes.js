const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const gCalController = require("../controllers/googleCalendarApiController");

const router = express.Router();
router.use(bodyParser.json());
router.use(
  session({
    secret: "I am a secret ;)",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

router.get("/authorize", gCalController.authorize);
router.get("/oauth2callback", gCalController.oauth2callback);

router.get("/events", gCalController.getEvents);
router.get("/createevent/", gCalController.createEvent);

module.exports = router;
