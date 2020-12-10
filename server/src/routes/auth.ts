module.exports = function(app:any) {

    const User = require('../models/auth');

    app.get('/check', async function (req:any, res:any) {
        await User.check(req, res);
    });

    app.post('/login', async function (req:any, res:any) {
        await User.login(req, res);
    });

    app.get('/logout',async function(req:any, res:any) {
        await User.logout(req, res);
    });

    app.post('/register',async function (req:any, res:any) {
        await User.register(req, res);
    });

}