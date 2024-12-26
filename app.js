// Importing Required Modules
const express = require('express');
const app = express();
const path = require('path')
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { urlencoded } = require('express');
const port = 850

// Pug____
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))


// PATH/DIRECTORY STUF --
app.use('/static', express.static('static')) // For Accessing CSS,JS etc
app.set('views', path.join(__dirname, 'views')) // Set The Directory for the Template
app.use(express.urlencoded()) //To obtain value from Form Inputs

// MONGO DB STUF --
mongoose.connect('mongodb://localhost/BlogStar', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection; //definining the data base
db.on('error', console.error.bind(console, 'connection error:')); //If connection failed
db.once('open', function() { console.log("DataBase Connected"); }); //If Succeed
const detailSchema = new mongoose.Schema({ userName: String, userMail: String, userQuerry: String }); //Contact Form Schema
const Inserter = mongoose.model('Customer Care', detailSchema);
const logSchema = new mongoose.Schema({ logname: String, logmail: String, pass: String }); //Login From Model
const modal = mongoose.model('Users Account', logSchema);


// Contact Form
app.post('/con', (req, res) => {
    let name = (req.body.name)
    let mail = (req.body.mail)
    let querry = (req.body.querry);

    // Sending the data into the DataBase ----
    let newquerry = new Inserter({ userName: name, userMail: mail, userQuerry: querry });

    newquerry.save(function(err, userData) {
        if (err) return console.error(err);
    });

    // Sending the Support E-Mail
    if (mail.includes('@') && name != '' && querry != '' && mail.includes('.')) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ID,
                pass: process.env.PASS
            },
        }); //Setting Sender's ID

        let mailOptions = {
            from: 'arpitmaurya1506@gmail.com',
            to: mail,
            subject: 'BlogStar Support',
            html: `<h1 style="text-align: center;padding: 15px;font-family: Arial, Helvetica, sans-serif;background-color: rgb(168, 101, 255);">Blogstar Support </h1>
            <div style="padding: 2%;border: 2px solid purple;">
                <h2 style="color:black">Hey ${name} we have recieved your query.You will recieve the reply within 24hrs.</h2>
            </div>`
        }; //Details From Contact Form

        //Sending and Recieving the E-Mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else { //Recieving the Query into Our E-mail

                console.log(`Email succesfully sent to ${name} Email :${mail} , Query : ${querry} and Saved `);

                let maildetail = { from: 'arpitmaurya1506@gmail.com', to: 'arpitmaurya1506@gmail.com', subject: "BlogStar Contact", html: `
                <h1 style="text-align: center;padding: 15px;font-family: Arial, Helvetica, sans-serif;background-color: rgb(168, 101, 255);">Blogstar Contact </h1>
                <div style="padding: 2%;border: 2px solid purple;">
                    <h2>Recieved From ${name} <br> Email :${mail}</h2>
                    <hr>
                    <h2>Query :</h2>${querry} </div>` };

                transporter.sendMail(maildetail, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Query Recieved in G-Mail')
                    }
                });
            }
        });
    }

    res.redirect('localhost:850/contact');
})

//Signup Form 
app.post('/signup', (req, res) => {
    let signname = (req.body.logname);
    let signmail = (req.body.logmail);
    let signpass = (req.body.pass);

    // Sending to DB
    let newsignup = new modal({
        logname: signname,
        logmail: signmail,
        pass: signpass
    });

    modal.find({ logmail: signmail }, function(err, Results) {
        console.log(Results)
        if (err) {
            console.error(err);
            req.app.locals.specialContext = 'Something Went Wrong Please Try Again Later!'
            res.redirect("/log");

        } else if (Results == '') {
            newsignup.save(function(err, userData) {
                if (err) return console.error(err);
                req.app.locals.specialContext = 'Registered Successfully !! Please Login.'
                res.redirect("/log");
            });

        } else {
            req.app.locals.specialContext = 'You already have an account.Please Login !!'
            res.redirect("/log");
        }

    })

})

//Login Form
app.post('/login', (req, res) => {
    let loginmail = (req.body.logmail);
    let loginpass = (req.body.pass);
    console.log(loginmail);
    // Checking User
    modal.find({ logmail: loginmail }, function(err, Results) {
        console.log(Results)
        if (err) {
            console.error(err);
            req.app.locals.specialContext = 'Something Went Wrong Please Try Again Later!'
            res.redirect("/log");

        } else if (Results != '') {
            if (Results[0].pass == loginpass) {
                console.log('Hogya Login')
                req.app.locals.specialContext = `{"mailid":"${loginmail}"}`
                res.redirect('/');

            } else if (Results[0].logmail == loginmail) {
                req.app.locals.specialContext = 'Either Email or Password is wrong!'
                res.redirect("/log");
            }
        } else {
            req.app.locals.specialContext = 'User not found. Please Sign Up.'
            res.redirect("/log");
        }

    })

})

// Get Request ENDPOINTS --
app.get("/", (req, res) => { var context = req.app.locals.specialContext;
     res.status(200).render('home.pug', { mssg: context });console.log("got the req");
     req.app.locals.specialContext = null;
    });
app.get("/blog1", (req, res) => { res.status(200).render('blog1.pug'); });
app.get("/blog2", (req, res) => { res.status(200).render('blog2.pug'); });
app.get("/blog3", (req, res) => { res.status(200).render('blog3.pug'); });
app.get("/blog4", (req, res) => { res.status(200).render('blog4.pug'); });
app.get("/blog5", (req, res) => { res.status(200).render('blog5.pug'); });
app.get("/blog6", (req, res) => { res.status(200).render('blog6.pug'); });
app.get("/blog7", (req, res) => { res.status(200).render('blog7.pug'); });
app.get("/blog8", (req, res) => { res.status(200).render('blog8.pug'); });
app.get("/contact", (req, res) => { res.status(200).render('contact.pug'); });
app.get("/log", (req, res) => {
    var context = req.app.locals.specialContext;
    res.render("login.pug", { mssg: context });
    req.app.locals.specialContext = null;
});
app.get('*', (req, res) => { res.redirect('/') });

// STARTING THE SERVER --
app.listen(port, () => { console.log('The application started succesfully at : ', `http://localhost:${port}/`) })
