const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "2.news.html"));
});

const newsTitles = [
  "정부, AI 산업 육성 위한 5년 로드맵 발표",
  "국내 스타트업, 차세대 배터리 기술로 글로벌 시장 진출",
  "올해 여름 역대급 폭염 예보… 전력 수급 비상",
  "메타버스 기반 원격 근무, 기업 도입 확산",
  "청년 주거 지원 정책 확대… 월세 부담 완화 기대",
  "글로벌 증시 변동성 확대, 투자자들 신중 모드",
  "국내 게임사, 신작 MMORPG로 해외 흥행 돌풍",
  "전기차 충전 인프라 확충… 지방 소도시까지 확대",
  "의료 AI 진단 정확도 향상, 실제 병원 현장 적용",
  "온라인 교육 플랫폼 이용자 수 역대 최고 기록",
];

app.get("/newsfeed", (req, res) => {
  //SSE 헤더 설정
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  //뉴스 전송
  let index = 0;
  const sendNews = () => {
    if (index >= newsTitles.length) {
      index = 0;
    }

    const news = newsTitles[index];
    res.write(`data: ${JSON.stringify({ news })}\n\n`);
    index++;
  };

  const interval = setInterval(
    () => {
      sendNews();
    },
    Math.floor(Math.random() * 3000) + 2000,
  );

  req.on("close", () => {
    console.log("클라이언트가 떠나서 타이머 종료: ", interval);
    clearInterval(interval);
  });
});

app.listen(3000, () => {
  console.log(`서버가 준비되었습니다.`);
});
