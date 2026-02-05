require("dotenv").config({ quiet: true });

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");

const app = express();
const port = 3000;

const SECRET_KEY = process.env.TOSS_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("TOSS_SECRET_KEY 환경변수를 설정해 주세요.");
}

const encodedApiSecretKey =
  "Basic " + Buffer.from(SECRET_KEY + ":").toString("base64");

app.use(express.static("public"));
app.use(express.json());

app.post("/confirm", async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;
  try {
    const response = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        paymentKeym,
        orderIdm,
        amount,
      },
      {
        headers: {
          Authorization: encodedApiSecretKey,
          "Content-Type": "application/json",
        },
      },
    );
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log(error);
      res.status(500).json({ message: "결제 승인 실패" });
    }
  }
});

app.post("/cancel", (req, res) => {});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/product.html"));
});

app.get("/checkout", (req, res) => {
  res.sendFile(path.resolve("./public/checkout.html"));
});

app.get("/success", (req, res) => {
  res.sendFile(path.resolve("./public/success.html"));
});

app.get("/fail", (req, res) => {
  res.sendFile(path.resolve("./public/fail.html"));
});

app.listen(port, () => {
  console.log(`http://localhost:${port} 으로 샘플 앱이 실행되었습니다.`);
});
