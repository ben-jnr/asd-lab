import session from 'express-session';

module.exports = function(app:any) {
    app.use(session(require('../config/session')));
    console.log("Succesfully setup express-sessions");
}
