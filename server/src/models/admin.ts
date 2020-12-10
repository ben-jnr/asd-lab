const Admin:any = function(){};



Admin.login = async function (req:any, res:any){  
    const sql = require('./db.ts');
    const Store = await require('./store');
    await Store.authenticateAdmin(req,res,sql);
}     




Admin.pending = async function(req:any, res:any) {
    const sql = require('./db.ts');
    sql.query("select id,username,name,location,contact from industry where approval='N'", 
        function(err:any,response:any){
            if(err) {
                console.log(err);
                res.status(200).send("error in reading from database");
            }
            else {
                console.log("pending requests succesfully read");
                res.status(200).send(response);
            }

    })
}




function saveSessionAdmin(req:any,res:any):any {
    console.log("inside save session admin");
    req.session.cookie.expires = new Date(Date.now() + 3600000);
    req.session.save(function(error:any){
        if(error) {
            console.log(error);
            res.status(200).send('error in saving sessions');
        }
    }) 
}




async function approveAdmin(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    sql.query('insert into approval (industry_id, admin_id) values(?)', 
        [[req.body.id, response[0].id]], function(error:any, resp:any) {
            if(error) {
                console.log(error);
                res.status(200).send("\nerror in inserting into approval");
            }
            else {
                sql.query('update industry set approval = "Y" where id=?',req.body.id,
                    function(error:any, resp:any ){
                        if(error) {
                            console.log(error);
                            res.status(200).send("\nerror in modifying industry");
                        }
                        else {
                            res.status(200).send({mssg:"successfully approved"});
                        }
                    }
                )
            }
        }
    )
}




async function rejectAdmin(req:any,res:any,response:any){
    const sql = await require('./db.ts');
    sql.query('delete from industry where id=? and approval ="N"', req.body.id, function(error:any, resp:any){
        if(error) {
            console.log(error);
            res.status(200).send("\nerror in deleting from industry")
        }
        else {
            res.status(200).send({mssg:"succesfully rejected"});
        }
    })
}



async function searchAdmin(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    if(req.body.criteria === 'your approvals') {
        sql.query("select distinct id,username,name,location,contact from industry where approval = 'Y' and id in " + 
            "(select industry_id from approval where admin_id = ?)", response[0].id, function(error:any, resp:any){
                if(error) {
                    console.log(error);
                    res.status(200).send("\nerror in searching for your approvals");
                }
                else {
                    res.status(200).send(resp);
                }
            }
        )
    }
    else if(req.body.criteria === 'name') {
        sql.query('select id,username,name,location,contact from industry where approval = "Y" and (name like ? or username like ?)',
            ["%"+req.body.query+"%","%"+req.body.query+"%"], function(error:any, resp:any) {
                if(error) {
                    console.log(error);
                    res.status(200).send("\nerror in searching for industires based on names");
                }
                else {
                    res.status(200).send(resp);
                }
            }
        )
    }
    else if(req.body.criteria === 'location') {
        sql.query('select id,username,name,location,contact from industry where approval = "Y" and location like ?',
            "%"+req.body.query+"%", function(error:any, resp:any) {
                if(error) {
                    console.log(error);
                    res.status(200).send("\nerror in searching for industires based on location");
                }
                else {
                    res.status(200).send(resp);
                }
            }
        )
    }
    else if(req.body.criteria === 'scrap') {
        sql.query('select I.id,I.username,I.name,I.location,I.contact ' +
            'from industry as I,available as A where I.id = A.industry_id and A.name like ?',"%"+req.body.query+"%",
            (error:any, resp:any)=>{
                console.log(resp);
                if(error) {
                    console.log(error);
                    res.status(200).send("unable to search based on scrap");
                }
                else {
                    res.status(200).send(resp);
                }
            })
    }
}




async function getScrapAdmin(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    await sql.query('select * from scrap order by type,name',function(error:any, resp:any) {
        if(error) {
            console.log(error);
            res.status(200).send("unable to read from scrap table");
        }
        else {
           res.status(200).send(resp);
        }
    })
}



async function addScrapAdmin(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    await sql.query('insert into scrap (name,type,hazard) values (?)',
        [[req.body.name, req.body.type, req.body.hazard]], function(error:any, resp:any) {
            if(error) {
                console.log(error);
                res.status(200).send("unable to insert into scrap table");
            }
            else {
                getScrapAdmin(req,res,[]);
            }
        })
}




async function delScrapAdmin(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    sql.query('delete from scrap where id = ?', req.body.id, function(error:any,resp:any) {
        if(error) {
            console.log(error);
            res.status(200).send("unable to delete from scrap table");
        }
        else {
            getScrapAdmin(req,res,[]);
        }
    })
}




async function editScrapAdmin(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    sql.query('update scrap set name = ?, type=?, hazard=? where id = ?', 
        [req.body.name, req.body.type, req.body.hazard, req.body.id], function(error:any, resp:any){
            if(error) {
                console.log(error);
                res.status(200).send("unable to update scrap table");
            }
            else {
                getScrapAdmin(req,res,[]);
            }
        })
}


async function checkAdmin(req:any,res:any,fun:any) {
    const sql = await require('./db.ts');
    if(req.session.user_id) {
        if(req.session.type === 'admin') {
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
                        saveSessionAdmin(req,res);
                        console.log("\nAlready authenticated : ", req.session.user_id);
                        fun(req,res,response);
                    }
                }
            )
        }
        else{
            res.status.send("error, invalid user permissions");
        }
    }
    else {
        res.status(200).send("no existing cookie");
    };
}





Admin.approve = async function(req:any, res:any){
    checkAdmin(req,res,approveAdmin);
}

Admin.reject = async function(req:any, res:any){
    checkAdmin(req,res,rejectAdmin);
}

Admin.search = async function(req:any,res:any) {
    checkAdmin(req,res,searchAdmin);
}

Admin.addScrap = async function(req:any, res:any) {
    checkAdmin(req,res,addScrapAdmin);
}

Admin.getScrap = async function(req:any, res:any) {
    checkAdmin(req,res,getScrapAdmin);
}

Admin.delScrap = async function(req:any, res:any) {
    checkAdmin(req,res,delScrapAdmin);
}

Admin.editScrap = async function(req:any, res:any) {
    checkAdmin(req,res,editScrapAdmin);
}


module.exports = Admin;