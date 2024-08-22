const express = require("express");
const app = express();
const axios = require("axios");
const mailer = require("nodemailer");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Admin = require("./models/admin");
const Users = require("./models/users");
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
      title: ["30 mintes plans", "60 mintes plans", ""],
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
      plansThree: [],
    });
  } else if (req.params.type === "circles") {
    res.render("register", {
      title: ["30 mintes plans", "60 mintes plans", ""],
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
      plansThree: [],
    });
  } else if (req.params.type === "courses") {
    res.render("register", {
      title: ["Arabic Courses", "Islamic Studies Courses", "Qurainc Courses"],
      plansOne: [
        ["Arabic Conversation", "ARAB-CONV"],
        ["Arabic Egyption Dialect", "ARAB-EGYP"],
        ["Arabic Reading", "ARAB-READ"],
      ],
      plansTwo: [
        ["Islamic Aqidah", "ISLM-AQID"],
        ["Islamic Fiqh", "ISLM-FIQH"],
        ["Islamic Hadith", "ISLM-HADI"],
        ["Islamic History", "ISLM-HIST"],
        ["Islamic Seerah", "ISLM-SEER"],
        ["Islamic Stories", "ISLM-SORE"],
        ["Islamic Tafseer", "ISLM-TAFS"],
        ["Islamic Tarbyah", "ISLM-TARB"],
      ],
      plansThree: [
        ["Qaida and Noor al byan", "QURN-QNAB"],
        ["Quran Memorization", "QURN-MEMO"],
        ["Quran Recitation", "QURN-RECI"],
        ["Quran Tajweed", "QURN-TAJW"],
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

// Courses
app.get("/courses/:type", (req, res) => {
  let type = req.params.type;

  data = {
    name: `${type[0].toUpperCase()}${type.slice(1)}`,
    type: type,
    logo: `/assets/${type}_courses.png`,
  };

  if (type == "quran") {
    courses = [
      {
        img: "quran.jpg",
        title: "📚 Quran for Beginners",
        des: "Learn the Quran from scratch, mastering reading, understanding, and memorization. 🎓 Embark on a transformative journey. 🌱",
      },
      {
        img: "quran/noor.jpg",
        title: "📖 Noor al Bayan / Qaida Course",
        des: "Master the Arabic alphabet, pronunciation, and reading skills. 📚 Start your Quranic journey with confidence. 🤲",
      },
      {
        img: "quran/memo.jpg",
        title: "🧠 Quran Memorization Course",
        des: "Learn effective memorization techniques and recite the Quran with passion. 🕋 Achieve spiritual enlightenment. 💫",
      },
      {
        img: "quran/reci.jpg",
        title: "💬 Quran Recitation Course",
        des: "Develop a fluent and expressive recitation style. Connect with the Quran on a deeper level. 📖",
      },
      {
        img: "quran/tajweed.jpg",
        title: "😎 Tajweed Course",
        des: "Learn the intricate rules of Tajweed for beautiful Quranic recitation. 🎙️ Elevate your spiritual experience. 🙏",
      },
    ];
  } else if (type == "arabic") {
    courses = [
      {
        img: "arabic.jpg",
        title: "🚀 Master Arabic: A Complete Guide",
        des: " Learn Arabic from scratch, mastering reading, writing, speaking, and understanding. 🎓 Achieve fluency and cultural understanding. 🌍",
      },
      {
        img: "arabic/reading.jpg",
        title: "📖 Arabic Reading Course",
        des: "Master the Arabic alphabet, pronunciation, and reading skills. 📚 Unlock the world of Arabic literature. 📖",
      },
      {
        img: "arabic/conv.jpg",
        title: "💬 Arabic Conversation Course",
        des: "Learn essential conversational phrases and practice speaking Arabic in real-life situations. 🗣️ Enhance your communication skills. 🤝",
      },
      {
        img: "arabic/egyption.jpg",
        title: "🇪🇬 Egyptian Colloquial Arabic Course",
        des: "Master Egyptian slang and dialects. 🗣️ Connect with Egyptians on a deeper level.",
      },
    ];
  } else if (type == "islamic") {
    courses = [
      {
        img: "islamic.jpg",
        title: "🚀 Start Your Islamic Journey",
        des: "Build a strong foundation in Islam. 📚 Learn core beliefs, prayers, and how to live a good Muslim life. 🚀",
      },
      {
        img: "islamic/AQIDAH.JPG",
        title: "Aqidah Course",
        des: "Explore the core beliefs of Islam and develop a strong Islamic worldview. 📖 Understand the attributes of Allah, prophethood, and the unseen world. 💫",
      },
      {
        img: "islamic/fiqh.jpg",
        title: "Fiqh Course",
        des: "Understand the principles and rulings governing various aspects of Muslim life. 📚 Explore pure worship, family law, transactions, and more. ⚖️",
      },
      {
        img: "islamic/Hadith.jpg",
        title: "📜 Hadith Course",
        des: "Learn the sayings and actions of Prophet Muhammad (peace be upon him). 📚 Study Hadith sciences, collections, and their practical applications. 📜",
      },
      {
        img: "islamic/islamic histoory.jpg",
        title: "🌍 Islamic History Course",
        des: "Explore the rise of Islam, Islamic civilizations, and its impact on global history. 🗺️ Understand the past to shape the future. 🌍",
      },
      {
        img: "islamic/seerah.jpg",
        title: "Seerah Course",
        des: "ﷺ Learn from the life and teachings of Prophet Muhammad (peace be upon him). 📚 Discover his character, leadership, and impact on the world. ✨",
      },
      {
        img: "islamic/stories.jpg",
        title: "Quranic and Prophets Stories",
        des: " Discover inspiring tales of faith, courage, and perseverance. 📚 Learn about Noah, Moses, Jesus, and more. 📖",
      },
      {
        img: "islamic/tafseer.jpg",
        title: "📚 Tafseer Course",
        des: "Explore the meaning, context, and wisdom of the Quran. 📚 Learn core principles, historical context, linguistic analysis, and practical application. 📖",
      },
      {
        img: "islamic/tarbyah.jpg",
        title: "Tarbyah Islamiyah Course",
        des: "Learn about supplications, remembrances, and Islamic etiquette. 🤲 Enhance your connection with Allah and refine your behavior.",
      },
    ];
  }

  res.render("courses", { data, courses });
});

// Codes API
app.post("/site/promotion/codes", (req, res) => {
  res.send([
    ["FREE30", "30 minutes free lecture"],
    ["OFF25", "25% off for a month"],
    ["MONTH6", "Special Discount For 6 Month Plan"],
  ]);
});

// admin
app.get("/admin", (req, res) => {
  if (req.cookies.user_id != null) {
    Admin.findById(req.cookies.user_id)
      .then(() => {
        // res.send("user is done");

        Users.find()
          .then((data) => {
            res.render("dash", { data });
          })
          .catch((err) => {
            res.send("Please Reload The Page!");
          });

        // res.render("dash");
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
        // res.send("Hello Saleh!");
        res.render("dash");
      } else {
        res.send("Password is wrong");
      }
    })
    .catch((err) => {
      res.send("user not found!");
    });
});

app.post("/admin/newUser", (req, res) => {
  Users.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    teacher: req.body.teacher.toLowerCase(),
    country: req.body.country,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    link: req.body.link,
  })
    .then(() => {
      res.send("User Added Successfully!");
    })
    .catch((err) => {
      res.render("msg", {
        msg: "User Not Added, Please Call The Owner to restart DB.",
      });
    });
});

app.post("/admin/deleteUser", (req, res) => {
  Users.deleteOne({ id: req.body.id })
    .then((msg) => res.send("User Deleted Successfully!"))
    .catch((err) => {
      res.render("msg", { msg: "User Not Deleted!" });
    });
});

// post request
const transporter = mailer.createTransport({
  host: "mail.alikhlas-institute.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});

app.post("/send", async (req, res) => {
  const token = req.body["g-recaptcha-response"];
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

  try {
    const response = await axios.post(verificationUrl);
    const success = response.data.success;

    if (success) {
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

      ejs.renderFile("./views/mail.ejs", data, async function (err, ejsout) {
        await new Promise((resolve, reject) => {
          transporter.sendMail(
            {
              from: process.env.MAIL,
              to: "alikhlasins@gmail.com",
              subject: "Support request 👮‍♂️",
              html: ejsout,
            },
            (err, info) => {
              if (err) {
                res.render("msg", {
                  msg: "Error there is a problem sending your message! Please Contact us via Email.",
                });
              } else {
                res.render("msg", { msg: "Message was send successfully!" });
              }
            }
          );
        });
      });
    } else {
      res.render("msg", { msg: "reCAPTCHA failed. Please try again." });
    }
  } catch (err) {
    res.render("msg", { msg: "reCAPTCHA failed. Please try again." });
  }
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

  ejs.renderFile("./views/regmail.ejs", data, async function (err, ejsout) {
    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: process.env.MAIL,
          to: "Alikhlasins@gmail.com",
          subject: "New Student want to register 😊",
          html: ejsout,
        },
        (err, info) => {
          if (err) {
            res.render("msg", {
              msg: "Sorry there was an error. Please contact us via Mail or Whatsapp.",
            });
          } else {
            res.render("msg", {
              msg: "Thank you, our team will mail you within 48 hours. please check your email and WhatsApp.",
            });
          }
        }
      );
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
