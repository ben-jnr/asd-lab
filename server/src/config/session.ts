const sessionStore = require('../models/sessionStore');

module.exports =  {
    key: "scraptrade",
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie:{maxAge:3600000}
}