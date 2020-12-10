module.exports = function(app:any) {

    const Admin = require('../models/admin');

    app.post('/admin/login', async function (req:any, res:any) {
        await Admin.login(req, res);
    });

    app.get('/admin/pending',async function(req:any, res:any) {
        await Admin.pending(req,res);
    });

    app.post('/admin/approve',async function(req:any, res:any){
        await Admin.approve(req,res);
    });

    app.post('/admin/reject',async function(req:any, res:any){
        await Admin.reject(req,res);
    });

    app.post('/admin/search',async function(req:any, res:any){
        await Admin.search(req,res);
    });

    app.get('/admin/scrap',async function(req:any, res:any){
        await Admin.getScrap(req,res);
    });

    app.post('/admin/scrap/add',async function(req:any, res:any){
        await Admin.addScrap(req,res);
    });

    app.post('/admin/scrap/delete',async function(req:any, res:any){
        await Admin.delScrap(req,res);
    });

    app.post('/admin/scrap/update',async function(req:any, res:any){
        await Admin.editScrap(req,res);
    });


}