import React from 'react';
import reg from '../Functions/Register';




function Register() {
    return<>
        <div className="modal fade" id="RegModal" aria-labelledby="RegModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="RegModalLabel">Register</h5>
              </div>
              <div className="modal-body">
                <form id="RegForm" className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="RegName" type="text" />
                      <label htmlFor="RegName">Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="RegUsername" type="text"/>
                      <label htmlFor="RegUsername">Username*</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="RegPassword" type="password"/>
                      <label htmlFor="RegPassword">Password*</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="RegRetypePassword" type="password"/>
                      <label htmlFor="RegRetypePassword">Retype Password*</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="RegLocation" type="text"/>
                      <label htmlFor="RegLocation">Location</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="RegPhone" type="tel" pattern="[0-9]{10}"/>
                      <label htmlFor="RegPhone">Phone*</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <a id="RegBtnClose" className="waves-effect waves-light btn" data-dismiss="modal">Close</a>
                <a id="RegBtn" className="waves-effect waves-light btn" onClick = {() => reg().then(()=>{}).catch((err)=>console.log(err))}>Submit</a>
              </div>
            </div>
          </div>
        </div>
    </>
}

export default Register;