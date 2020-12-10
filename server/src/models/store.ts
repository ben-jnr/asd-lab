const Store:any = function(store:any){};


function saveSession(req:any,res:any):any {
    console.log("inside save session");
    req.session.cookie.expires = new Date(Date.now() + 3600000);
    req.session.save(function(error:any){
        if(error) {
            console.log(error);
            res.status(200).send('error in saving sessions');
        }
    }) 
}



Store.isAuthenticated = async function(req:any, res:any,sql:any){
    if(req.session.user_id) {
        if(req.session.type === 'industry') {
            await sql.query('select id,name,username,location,contact,approval from industry where id=?'
                ,req.session.user_id, function (error:any, response:any) {
                    if(error) {
                        console.log(error);
                        res.status(200).send("error in reading from database");
                    }    
                    else if(response.length === 0) {
                        req.session.destroy();
                        res.status(200).send("error, invalid cookie");
                    }
                    else if(response[0].approval === 'N') {
                        req.session.destroy();
                        res.status(200).send("error, not enough permissions");
                    }
                    else {
                        saveSession(req,res);
                        console.log("\nAlready authenticated : ", req.session.user_id);
                        response[0].type = 'industry';
                        res.status(200).send(response);
                    }
                }
            )
        }
        else if(req.session.type === 'admin') {
            await sql.query('select id,name,username from admin where id=?'
                ,req.session.user_id, function (error:any, response:any){
                    if(error) {
                        console.log(error);
                        res.status(200).send("error in reading from database");
                    }    
                    else if(response.length == 0) {
                        req.session.destroy();
                        res.status(200).send("error, invalid cookie");
                    }
                    else {
                        saveSession(req,res);
                        console.log("\nAlready authenticated : ", req.session.user_id);
                        response[0].type = 'admin';
                        res.status(200).send(response);
                    }
                }
            )
        }
    }
    else
        res.status(200).send("no existing cookie");
}



Store.authenticate = function(req:any, res:any, sql:any) {
    sql.query('select id,name,username,location,contact,approval from industry where username = ? and password = ?'
        ,[req.body.username, req.body.password], (error:any, response:any)=>{
            if(error) {
                console.log(error);
                res.status(200).send("error in reading from database");
            }
            else if(response.length == 0) {
                req.session.destroy();
                res.status(200).send("error in authentication, invalid user");
            }
            else if(response[0].approval === 'N') {
                req.session.destroy();
                res.status(200).send("error, not enough permissions");
            }
            else {
                req.session.user_id = response[0].id;
                req.session.type = 'industry';
                saveSession(req,res);
                console.log("Authenticated user : ",req.session.user_id);
                res.cookie = req.sessionID;
                response[0].type = 'industry';
                res.status(200).send(response);
            }
        }
    )
}



Store.authenticateAdmin = function(req:any, res:any, sql:any) {
    sql.query('select id,name,username from admin where username = ? and password = ?'
        ,[req.body.username, req.body.password], (error:any, response:any)=>{
            if(error) {
                console.log(error);
                res.status(200).send("error in reading from database");
            }
            else if(response.length == 0) {
                req.session.destroy();
                res.status(200).send("error in authentication, invalid admin");
            }
            else {
                req.session.user_id = response[0].id;
                req.session.type = 'admin';
                saveSession(req,res);
                console.log("Authenticated user : ",req.session.user_id);
                res.cookie = req.sessionID;
                response[0].type = 'admin';
                res.status(200).send(response);
            }
        }
    )
}


Store.logout = async function(req:any, res:any) {
    await req.session.destroy();
    res.clearCookie("scraptrade");
    res.send("logged out");
}



module.exports = Store;