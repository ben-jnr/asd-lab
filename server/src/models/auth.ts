const User:any = function(){};


User.check = async function(req:any, res:any) {
    const sql = await require('./db.ts');
    const Store = await require('./store');
    await Store.isAuthenticated(req,res,sql);
} 


User.login = async function (req:any, res:any){ 
    const sql = await require('./db.ts'); 
    const Store = await require('./store');
    await Store.authenticate(req,res,sql);
}     


User.register = async function(req:any, res:any) {
    const sql = require('./db.ts');
    const Store = require('./store');
    const newUser = req.body;
    sql.query('insert into industry (name,username,password,location,contact) ' + 
        'VALUES (?)',[[newUser.name,newUser.username,newUser.password,newUser.location,newUser.contact]], 
        async (error:any, response:any)=> {
            if(error) {
                console.log(error);
                res.status(200).send("error in registering");
            }
            else
                res.status(200).send("You can login, once your account is approved");
        })
}


User.logout = async function(req:any, res:any) {
    const Store = require('./store');
    await Store.logout(req ,res);
}

module.exports = User;