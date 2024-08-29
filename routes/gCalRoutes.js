const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const gCalController = require("../controllers/googleCalendarApiController");
const gAuth = require("../middleware/googleOAuth");

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

router.get("/oauth2callback", gAuth.oauth2callback);

router.get("/events", gAuth.authenticate, gCalController.getEvents);
router.get("/events/create", gAuth.authenticate, gCalController.createEvent);
router.get("/events/:eventId", gAuth.authenticate, gCalController.getEventById);
router.get("/events/today", gAuth.authenticate, gCalController.getTodayEvent);

module.exports = router;
