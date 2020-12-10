import React from 'react'
import login from '../Functions/Login';

function Login() {
    return<>
        <div className="modal fade" id="LoginModal" aria-labelledby="LoginModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">    
              <div className="modal-header">
                <h5 className="modal-title" id="LoginModalLabel">Login</h5>
              </div>
              <div className="modal-body">
                <form id="LoginForm" className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="LoginUsername" type="text"/>
                      <label htmlFor="LoginUsername">Username*</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="LoginPassword" type="password"/>
                      <label htmlFor="LoginPassword">Password*</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <a id="LoginBtnClose" className="waves-effect waves-light btn" data-dismiss="modal">Close</a>
                <a id="LoginBtn" className="waves-effect waves-light btn" onClick = {() => login().then(()=>{}).catch((err)=>console.log(err))}>Submit</a>
              </div>
            </div>
          </div>
        </div>
    </>
}

export default Login;