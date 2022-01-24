import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App';
import { useHistory } from 'react-router-dom';
import Axios from 'axios'
// import { Link } from 'react-router-dom'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const submitHandle = () => {
        Axios.post('http://localhost:3001/signup', { email: email, password: password, age: age }).then(() => {
            alert("Successfull insert");
        })
    };
    return (
        <>
            <div className="row">
                <div className="card card-naa" style={{ width: "22rem", height: "45vh" }}>
                    <img className="image" src="https://th.bing.com/th/id/OIP.fPLNxq8H130BPl4e2A2h7wHaEK?w=281&h=180&c=7&r=0&o=5&pid=1.7" alt="Covid Image" style={{ width: "8rem", height: "5rem", border: "1rem" }} />
                    <center><h1 style={{ color: "white" }}>Sign Up</h1></center>
                    <center><h6 style={{ color: "white" }}>Vaccine lagwaiye, Mask Free Ho jaiye</h6></center>

                </div>
                <div className="card card-na" style={{ width: "22rem", height: "45vh" }}>
                    <div className="card-body">
                        <form className="card-na">
                            <div className="form-floating mb-3 log-names">
                                <input type="email" className="form-control" id="floatingInput" style={{ width: '40vh' }} placeholder="name@example.com" onChange={(e)=>{
                                    setEmail(e.target.value)
                                }} />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3 log-passs">
                                <input type="password" className="form-control" id="floatingPassword" style={{ width: '40vh' }} placeholder="Password" onChange={(e)=>{
                                    setPassword(e.target.value)
                                }} />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating mb-3 log-passs">
                                <input type="number" className="form-control" id="floatingInput" style={{ width: '40vh' }} placeholder="Age" onChange={(e)=>{
                                    setAge(e.target.value)
                                }} />
                                <label for="floatingInput">Age</label>
                            </div>
                            <div className="d-grid gap-5 mx-auto d-md-flex" style={{ marginTop: '2 rem' }}>

                                <center>          <button className="btn btn-primary" type='submit' onClick={submitHandle}>Sign in</button></center>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup