const express = require("express");
const app = express();
const mailer = require("nodemailer");
const ejs = require("ejs");

require("dotenv").config();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.listen(3000, (req, res) => {
  console.log("Listing on port http://localhost:3000");
});

app.get("/", (req, res) => {
  res.render("index");
});

// post request
const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});

app.post("/send", (req, res) => {
  const data = {
    name: req.body.name,
    mail: req.body.mail,
    phone: req.body.phone,
    msg: req.body.msg,
  };

  if (data.phone.length == 0) {
    data["phone"] = "not given!";
  }

  ejs.renderFile("./views/mail.ejs", data, function (err, ejsout) {
    transporter.sendMail({
      from: process.env.MAIL,
      to: "testok.3090@gmail.com",
      subject: "New registration inquire",
      html: ejsout,
    });
    res.render("msg", { msg: "Message was send successfully!" });
  });
});

app.use((req, res) => {
  res.status(404).render("msg", { msg: "404 Page Not Found!" });
});
