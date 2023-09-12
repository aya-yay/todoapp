const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
const nodemailer = require("nodemailer");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));


const PORT = 5000;

//ルーティング設計
app.use("/api/v1/tasks", taskRoute);

//データベースと接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_FLY_IO_URL || process.env.MONGO_URL);
    app.listen(process.env.PORT || PORT, console.log("サーバが起動しました"));
  } catch (err) {
    console.log(err);
  }
};

start();

//contact-form server.js
//Middleware

app.get('/', (req, res) => {
  res.sendFile(__dirname + '../public/index.html');
})

app.post('/', (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASSWORD,
    },
  });
  //管理人が受け取るメール
  const mailOptions = {
    from: req.body.email,
    to: 'yabuuchi.a.yano@gmail.com',
    subject: `[お問い合わせ]: ${req.body.name}様より`,
    text: `${req.body.message} Send from ${req.body.email}`,
    html: `
        <p>【名前】</p>
        <p>${req.body.name}</p>

        <p>【メールアドレス】</p>
        <p>${req.body.email}</p>

        <p>【メッセージ内容】</p>
        <p>${req.body.message}</p>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log("送信完了: " + info.response);
      res.send("成功しました");
    }
  })
})







