const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3330;

const mailClient = nodemailer.createTransport({
  service: "Gmail.com",
  auth: {
    user: "cesarcisneros99@gmail.com",
    pass: "dwnieivwzzxnoxpj",
  },
});

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.post("/send-email", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  console.log(req.body);
  try {
    const results = await mailClient.sendMail({
      //   from: "cesar@mail.com",
      to: "cesarcisneros9@gmail.com",
      subject,
      text: `
        name: ${name},
        email: ${email || "not provided"},
        phone: ${phone || "not provided"}

        message: ${message}
      `,
    });
    console.log(results);
    res.json({ status: "success", message: "You're message has been sent." });
  } catch (error) {
    console.log(error, "error!!!");
  }
});

app.listen(port, () => console.log("listening on port " + port));
