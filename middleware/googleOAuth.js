const oauth2Client = require("../config/google");
const crypto = require("crypto");
const url = require("url");

state = crypto.randomBytes(32).toString("hex");

const authenticate = (req, res, next) => {
  if (!req.session.tokens) {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar"],
      include_granted_scopes: true,
      state: state,
    });
    req.session.state = state;
    req.session.originalUrl = req.originalUrl;
    res.redirect(authorizationUrl);
  } else {
    oauth2Client.setCredentials(req.session.tokens);
    req.session.oauth2Client = oauth2Client;
    next();
  }
};

const oauth2callback = async (req, res) => {
  let q = url.parse(req.url, true).query;

  if (q.error) {
    console.log("Error: " + q.error);
  } else if (q.state !== req.session.state) {
    console.log("State Mismatch");
  } else {
    const { tokens } = await oauth2Client.getToken(q.code);
    req.session.tokens = tokens;
    oauth2Client.setCredentials(tokens);
    req.session.oauth2Client = oauth2Client;

    const originalUrl = req.session.originalUrl;
    delete req.session.originalUrl;
    res.redirect(originalUrl);
  }
};

module.exports = { authenticate, oauth2callback };
