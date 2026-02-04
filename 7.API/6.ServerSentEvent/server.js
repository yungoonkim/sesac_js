const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "1.index.html"));
});

app.get("/events", (req, res) => {
  //SSE 헤더 설정
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendTime = () => {
    //웹 표준: 서버로부터 데이터가 올때의 포멧이... data: 내용물\n\n
    res.write(`data: ${new Date().toISOString()}\n\n`);
  };

  const interval = setInterval(sendTime, 1000); //매초 시간 정보 보내기..

  //연결이 종료되면? 클라이언트가 창 닫으면..

  req.on("close", () => {
    console.log("클라이언트가 떠나서 타이머 종료: ", interval);
    clearInterval(interval);
  });
});

app.listen(3000, () => {
  console.log(`서버가 준비되었습니다.`);
});
