module.exports = function(app:any) {

    const Industry = require('../models/industry');

    app.get('/industry/scrap',async function(req:any, res:any){
        await Industry.getScrap(req,res);
    });

    app.post('/industry/search',async function(req:any, res:any){
        await Industry.search(req,res);
    });

    app.get('/industry/available',async function(req:any, res:any){
        await Industry.getAvailable(req,res);
    });

    app.post('/industry/available/add',async function(req:any, res:any){
        await Industry.addAvailable(req,res);
    });

    app.post('/industry/available/delete',async function(req:any, res:any){
        await Industry.delAvailable(req,res);
    });

    app.post('/industry/available/update',async function(req:any, res:any){
        await Industry.editAvailable(req,res);
    });


}