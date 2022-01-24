import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

function Dashboard() {
    const [lisst, setListt] = useState([])
    // Axios.post()
    useEffect(() => {
        Axios.get("http://localhost:3001/dashboard").then((response) => {
            console.log(response.data)
            setListt(response.data)
        }).catch((err) => {
            console.log(err)
        })
    },[])
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
            <table className="table table-striped table-dark" style={{ width: "70rem", margin: "7.5rem" }}>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Vaccine Name</th>
                        <th scope="col">Center</th>
                        <th scope="col">Dose 1</th>
                        <th scope="col">Dose 2</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lisst.map((val) => {
                            return (
                                <tr>
                                    <th>{val.datee}</th>
                                    <td>{val.vaccine_name}</td>
                                    <td>{val.center}</td>
                                    <td>{val.dose1}</td>
                                    <td>{val.dose2}</td>
                                    <td>{val.total}</td>
                                    {/* <td>{}</td> */}
                                    {/* <td>452012</td> */}
                                </tr>

                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Dashboard