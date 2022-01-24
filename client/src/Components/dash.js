import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

function Dash() {
    const [lisst, setListt] = useState([])
    // Axios.post()

    // Axios.post("http://localhost:3001/user").then((response) => {
    //     console.log(response.data)
    //     setListt(response.data)
    // }).catch((err) => {
    //     console.log(err)
    // })
    return (
        <div>
            <header>
                <div className="boxx">
                    <div className="row">
                        <center><h1>Covin Notifier</h1></center>
                        <Link to='/' style={{ textDecoration: 'none' }}><button className="btn btn-info" type="button">Log out</button></Link>
                    </div>
                </div>
            </header>

            <div >

            <div className="card card-na" style={{ width: "18rem", height: "45vh" }}>
                    <div className="card-body">
                        <form className="card-na" action="http://localhost:3001/user" method="POST">
                            <div className="form-floating mb-3 log-names">
                                <input type="email" className="form-control" id="floatingInput" name="email"style={{ width: '40vh' }} placeholder="name@example.com" />
                                <label for="floatingInput">Confirm Your Email address</label>
                            </div>
                            <div className="form-floating mb-3 log-passs">
                                <input type="text" className="form-control" id="floatingPassword" name="pin" style={{ width: '40vh' }} placeholder="Pin code" />
                                <label for="floatingPassword">PIN Code</label>
                            </div>
                            <div className="d-grid gap-5 mx-auto d-md-flex" style={{ marginTop: '2 rem' }}>
                                <button className="btn btn-success" type='submit' >Get Details</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dash