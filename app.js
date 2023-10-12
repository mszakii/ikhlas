const express = require("express");
const app = express();
const mailer = require("nodemailer");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Admin = require("./models/admin");
const cookieParser = require("cookie-parser");

require("dotenv").config();

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log(">>> connected to DB successfully!");
  })
  .catch(() => {
    console.log(">>> Err faild to connect to DB (app.js)");
  });

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(3000, (req, res) => {
  console.log("Listing on port http://localhost:3000");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/plans/:type/register", (req, res) => {
  if (req.params.type === "private") {
    res.render("register", {
      plansOne: [
        ["2 days weekly", "MAIN-30-2"],
        ["3 days weekly", "MAIN-30-3"],
        ["4 days weekly", "MAIN-30-4"],
        ["5 days weekly", "MAIN-30-5"],
        ["6 days weekly", "MAIN-30-6"],
      ],
      plansTwo: [
        ["1 days weekly", "MAIN-60-1"],
        ["2 days weekly", "MAIN-60-2"],
        ["3 days weekly", "MAIN-60-3"],
        ["4 days weekly", "MAIN-60-4"],
        ["5 days weekly", "MAIN-60-5"],
        ["6 days weekly", "MAIN-60-6"],
      ],
    });
  } else if (req.params.type === "circles") {
    res.render("register", {
      plansOne: [
        ["2 days weekly", "CRCL-30-2"],
        ["3 days weekly", "CRCL-30-3"],
        ["4 days weekly", "CRCL-30-4"],
        ["5 days weekly", "CRCL-30-5"],
        ["6 days weekly", "CRCL-30-6"],
      ],
      plansTwo: [
        ["1 days weekly", "CRCL-60-1"],
        ["2 days weekly", "CRCL-60-2"],
        ["3 days weekly", "CRCL-60-3"],
        ["4 days weekly", "CRCL-60-4"],
        ["5 days weekly", "CRCL-60-5"],
        ["6 days weekly", "CRCL-60-6"],
      ],
    });
  } else {
    res.redirect("/error");
  }
});

// pages
app.get("/plans/private", (req, res) => {
  res.render("plans/private", {
    plan: "private",
    title: "Online Quran Private Lessons",
    logo: "/assets/3.png",
  });
});

app.get("/plans/circles", (req, res) => {
  res.render("plans/circles", {
    plan: "circles",
    title: "Online Quran Private Lessons for adults and kids",
    logo: "/assets/2.png",
  });
});

// Codes API
app.post("/site/promotion/codes", (req, res) => {
  res.send([
    ["FREE30", "30 minutes free lecture"],
    ["OFF25", "25% off for a month"],
  ]);
});

// admin
app.get("/admin", (req, res) => {
  if (req.cookies.user_id != null) {
    Admin.findById(req.cookies.user_id)
      .then(() => {
        res.send("user is done");
      })
      .catch((err) => {
        res.clearCookie("user_id");
        res.render("admin");
      });
  } else {
    res.render("admin");
  }
});

app.post("/admin", (req, res) => {
  Admin.findOne({ user: req.body.username })
    .then((admin) => {
      if (admin.pass === req.body.pass) {
        res.cookie("user_id", admin._id, { maxAge: 360000 });
        res.send("Hello Saleh!");
      } else {
        res.send("Password is wrong");
      }
    })
    .catch((err) => {
      res.send("user not found!");
    });
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
    title: "new message form contact section",
  };

  if (data.phone.length == 0) {
    data["phone"] = "not given!";
  }

  ejs.renderFile("./views/mail.ejs", data, function (err, ejsout) {
    transporter.sendMail({
      from: process.env.MAIL,
      to: "alikhlasins@gmail.com",
      subject: "Support request 👮‍♂️",
      html: ejsout,
    });
    res.render("msg", { msg: "Message was send successfully!" });
  });
});

app.post("/plans/:type/register", (req, res) => {
  const data = {
    first_name: req.body.first_name,
    full_name: req.body.full_name,
    mail: req.body.mail,
    phone: `+${req.body.countryCode}${req.body.phone}`,
    whatsapp: `https://wa.me/+${req.body.countryCode}${req.body.phone}`,
    country: req.body.country,
    gender: req.body.gender,
    age: req.body.age,
    msg: req.body.msg,
    type: req.params.type,
    plan: req.body.plan,
    title: "new student want to register",
    caption: "His",
    cap: "He",
  };

  if (req.body.gender == "female") {
    data.caption = "Her";
    data.cap = "She";
  }

  ejs.renderFile("./views/regmail.ejs", data, function (err, ejsout) {
    transporter.sendMail({
      from: process.env.MAIL,
      to: "Alikhlasins@gmail.com",
      subject: "New Student want to register 😊",
      html: ejsout,
    });

    res.render("msg", {
      msg: "Thank you, our team will mail you within 48 hours. please check your email and WhatsApp.",
    });
  });
});

// error log
app.get("/dev/err", (req, res) => {
  res.send(process.env.MAIL);
});

// Page not found

app.use((req, res) => {
  res.status(404).render("msg", { msg: "404 Page Not Found!" });
});
