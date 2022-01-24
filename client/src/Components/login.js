import React, { useState, useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';

import M from 'materialize-css';
import { UserContext } from '../App';
import Axios from 'axios'

function Login() {
    return (
        <div>
            <div className="row">
                <div className="card card-naa" style={{ width: "18rem", height: "45vh" }}>
                    <img className="image" src="https://th.bing.com/th/id/OIP.fPLNxq8H130BPl4e2A2h7wHaEK?w=281&h=180&c=7&r=0&o=5&pid=1.7" alt="Covid Image" style={{ width: "8rem", height: "5rem", border: "1rem" }} />
                    <strong><center><h1 style={{ color: "white" }}><u>Log in </u></h1></center></strong>
                    <center><h6 style={{ color: "white" }}>Vaccine lagwaiye, Mask Free Ho jaiye</h6></center>

                </div>

                <div className="card card-na" style={{ width: "18rem", height: "45vh" }}>
                    <div className="card-body">
                        <form className="card-na" action="http://localhost:3001/login" method="POST">
                            <div className="form-floating mb-3 log-names">
                                <input type="email" className="form-control" id="floatingInput" name="email"style={{ width: '40vh' }} placeholder="name@example.com" />
                                <label for="floatingInput">Email address</label>
                            </div>
                            
                            <div className="form-floating mb-3 log-passs">
                                <input type="password" className="form-control" id="floatingPassword" name="password" style={{ width: '40vh' }} placeholder="Password" />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div className="d-grid gap-5 mx-auto d-md-flex" style={{ marginTop: '2 rem' }}>
                                <button className="btn btn-success" type='submit' >Login</button>
                                <Link to='/sign' style={{ textDecoration: 'none' }}><button className="btn btn-info" type="button">Sign in</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Login