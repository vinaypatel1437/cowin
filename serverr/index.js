const express = require("express")
const app = express()
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cors = require('cors')
const cp = require("child_process")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")
const fs = require("fs")
const { response } = require("express")
var session = require('express-session');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cowin'
})
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'do.no.replu@gmail.com',
        pass: 'Vinay@123'
    }
})
// app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*",(req,res) => {
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/user', (req, res) => {
    const pin = req.body.pin;
    const email = req.body.email;
    console.log([pin])
    cp.execSync(`node gs.js ${pin} 23`)
    let vaccineO = fs.readFileSync('file.json', 'utf-8')
    vaccineO = JSON.parse(vaccineO)
    db.query("DELETE FROM vaccine")
    for (let i = 0; i < vaccineO.length; i++) {
        let vaccinename, total, datee, center;
        if (vaccineO[i].VaccineName == undefined  && vaccineO[i].total == undefined) {
            vaccinename = "NA";
            total = "NA";
        } else {
            vaccinename = vaccineO[i].VaccineName;
            total = vaccineO[i].Total;
            datee = vaccineO[i].Date;
            center = vaccineO[i].Center;
        }
        const sqlInsert = "INSERT INTO vaccine (vaccine_name,total,datee,center) VALUES (?,?,?,?)"
        db.query(sqlInsert, [vaccinename, total, datee, center], (err, result) => {
            console.log(err);
            console.log("resultss")
        });
    }
    console.log(email)
    const options = {

        from: 'do.no.replu@gmail.com',
        to: email,
        subject: 'Cowin Notifier',
        text: 'Your Vaccine details are as follows',
        attachments: {
            filename: 'Vaccinate.xlsx',
            path: __dirname + '/Vaccinate.xlsx'
        }
    }
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err); return;
        }
        console.log("Sent" + " " + info.response)
    })
    console.log("Resolved")
    res.redirect("http://localhost:3000/dashboard");
})
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.post('/signup', async (req, res) => {

    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);//using byrypt to get hashed password stored in database
    const age = req.body.age;
    db.getConnection(async (err, connection) => {
        if (err) throw (err)

        // whenever this is called we want to search in database.
        const sqlSearch = "SELECT*FROM cowinn WHERE email =?"
        const search_query = mysql.format(sqlSearch, [email]);
        // whenever this is called we want to insert something to database;
        const sqlInsert = "INSERT INTO cowinn(email,password,age) VALUES(?,?,?)"
        const insert_query = mysql.format(sqlInsert, [email, password, age])
        await connection.query(search_query, async (err, result) => {

            if (err) throw (err)
            console.log("-------> Searching Results");
            console.log(result.length);

            if (result.length != 0) {
                connection.release()// if given result matches the details in datbase release connection  from database,
                console.log("-------> User already exists");

            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release();
                    if (err) throw (err)
                    req.session.email = email;
                    const options = {
                        from: 'do.no.replu@gmail.com',
                        to: email,
                        subject: 'Cowin Notifier',
                        text: 'Sign up success'
                    }
                    transporter.sendMail(options, (err, info) => {
                        if (err) {
                            console.log(err); return;
                        }
                        console.log("Sent" + " " + info.response)
                    })
                    res.redirect("http://localhost:3000/dash");
                    console.log("--------> Created new User");
                })
            }

        })
    })

})
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.getConnection(async (err, connection) => {
        if (err) throw (err);
        const sqlSearch = "SELECT * FROM cowinn WHERE email=?"
        const search_query = mysql.format(sqlSearch, [email])
        await connection.query(search_query, async (err, result) => {
            connection.release();
            if (err) throw (err);
            if (result.length == 0) {
                console.log("----> User Does not exists");
                alert("User Does not exist")
            } else {
                const hasedPass = result[0].password
                if (await bcrypt.compare(password, hasedPass)) {
                    const options = {
                        from: 'do.no.replu@gmail.com',
                        to: email,
                        subject: "Cowin",
                        text: 'Sign in attempted'
                    }
                    transporter.sendMail(options, (err, info) => {
                        if (err) {
                            console.log(err); return;
                        }
                        console.log("Sent " + " " + info.response)
                    })
                    console.log("Resolved");
                    res.redirect("http://localhost:3000/dash");
                } else {
                    alert("Incorrect password")
                    console.log("Incorrect Password")
                }
            }
        })
    })
})
app.get('/get', (req, res) => {
    const sqlSelect = "SELECT * FROM  cowinn";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})
app.get('/dashboard', (req, res) => {
    const sqlSelect = "SELECT * FROM vaccine";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})
app.listen(3001, () => {
    console.log("running on Port 3001")
})