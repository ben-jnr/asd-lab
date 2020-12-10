const Industry:any = function(){};



function saveSessionIndustry(req:any,res:any):any {
    console.log("inside save session industry");
    req.session.cookie.expires = new Date(Date.now() + 3600000);
    req.session.save(function(error:any){
        if(error) {
            console.log(error);
            res.status(200).send('error in saving sessions');
        }
    }) 
}



async function searchIndustry(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    if(req.body.criteria === 'name') {
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
        sql.query('select distinct I.id,I.username,I.name,I.location,I.contact ' +
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




async function getScrapIndustry(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    sql.query('select distinct name from scrap order by name',function(error:any, resp:any) {
        if(error) {
            console.log(error);
            res.status(200).send("unable to read fro, database admin");
        }
        else {
            res.status(200).send(resp);
        }
    })
} 




async function getAvailableIndustry(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    sql.query('select A.name, S.type, S.hazard, A.qty, A.rate from available as A, scrap as S ' +
        'where A.industry_id = ? and A.name = S.name', req.session.user_id, function(error:any, response:any){
            if(error) {
                console.log(error);
                res.status(200).send("unable to read from database available");
            }
            else    
                res.status(200).send(response);
        })
    
}



async function addAvailableIndustry(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    await sql.query('insert into available (industry_id,name,qty,rate) values (?)',
    [[req.session.user_id,req.body.name, req.body.qty, req.body.rate]], function(error:any,resp:any){
        if(error) {
            console.log(error);
            res.status(200).send("error in reading from available database");
        }
        else {
            getAvailableIndustry(req,res,{});
        }
    })
}




async function delAvailableIndustry(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    await sql.query('delete from available where industry_id=? and name=?',[req.session.user_id, req.body.name], (error:any, resp:any)=>{
        if(error) {
            console.log(error);
            res.status(200).send("unable to delete from available");
        }
        else {
            getAvailableIndustry(req,res,{});
        }
    })
}




async function editAvailableIndustry(req:any,res:any,response:any) {
    const sql = await require('./db.ts');
    sql.query('update available set qty = ?, rate=? where industry_id=? and name = ?',
        [req.body.qty, req.body.rate,req.session.user_id, req.body.name], (error:any, resp:any)=>{
            if(error) {
                console.log(error);
                res.status(200).send("unable to update table available")
            }
            else {
                getAvailableIndustry(req,res,{});
            }
        })
}




async function checkIndustry(req:any,res:any,fun:any) {
    const sql = await require('./db.ts');
    if(req.session.user_id) {
        if(req.session.type === 'industry') {
            await sql.query('select id,name,username from industry where id=?'
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
                        saveSessionIndustry(req,res);
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




Industry.getScrap = async function(req:any,res:any) {
    checkIndustry(req,res,getScrapIndustry);
}

Industry.search = async function(req:any,res:any) {
    checkIndustry(req,res,searchIndustry);
}

Industry.addAvailable = async function(req:any, res:any) {
    checkIndustry(req,res,addAvailableIndustry);
}

Industry.getAvailable = async function(req:any, res:any) {
    checkIndustry(req,res,getAvailableIndustry);
}

Industry.delAvailable = async function(req:any, res:any) {
    checkIndustry(req,res,delAvailableIndustry);
}

Industry.editAvailable = async function(req:any, res:any) {
    checkIndustry(req,res,editAvailableIndustry);
}


module.exports = Industry;