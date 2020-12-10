import React from 'react'
import login from '../Functions/AdminLogin';


function Login() {
    return<>
        <div className="modal fade" id="AdminLoginModal" aria-labelledby="AdminLoginModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">    
              <div className="modal-header">
                <h5 className="modal-title" id="AdminLoginModalLabel">Admin Login</h5>
              </div>
              <div className="modal-body">
                <form id="AdminLoginForm" className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="AdminLoginUsername" type="text"/>
                      <label htmlFor="AdminLoginUsername">Username*</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="AdminLoginPassword" type="password"/>
                      <label htmlFor="AdminLoginPassword">Password*</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <a id="AdminLoginBtnClose" className="waves-effect waves-light btn" data-dismiss="modal">Close</a>
                <a id="AdminLoginBtn" className="waves-effect waves-light btn" onClick = {() => login().then(()=>{}).catch((err)=>console.log(err))}>Submit</a>
              </div>
            </div>
          </div>
        </div>
    </>
}

export default Login;