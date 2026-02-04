require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: 465,
    auth:{
        user: process.env.NAVER_EMAIL,
        pass: process.env.NAVER_PASSWORD
    }
});


const mailOptions = {
    from: process.env.NAVER_EMAIL,
    to: process.env.NAVER_EMAIL,
    subject: '🌱 테스트 이메일',
    html: `
    <div style="margin:0; padding:0; background-color:#f4f6f8;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0"
              style="background:#ffffff; margin:40px 0; border-radius:8px; overflow:hidden;
              font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', Arial, sans-serif;">

              <!-- Header -->
              <tr>
                <td style="background:#22c55e; padding:24px; text-align:center;">
                  <h1 style="margin:0; color:#ffffff; font-size:24px;">
                    🌱 새싹 이메일 테스트
                  </h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:32px; color:#333333;">
                  <p style="font-size:16px; margin:0 0 16px;">
                    안녕하세요 👋
                  </p>

                  <p style="font-size:15px; line-height:1.6; margin:0 0 24px;">
                    이것은 <strong>Node.js + Nodemailer</strong>를 사용해
                    처음으로 발송한 이메일입니다.<br />
                    네이버 SMTP 연동이 정상적으로 동작하고 있어요 ✅
                  </p>

                  <div style="background:#f1f5f9; padding:16px; border-radius:6px;
                    font-size:14px; color:#475569;">
                    ✔ 발송 시간: ${new Date().toLocaleString()}<br />
                    ✔ 발송 서버: Naver SMTP
                  </div>

                  <div style="text-align:center; margin-top:32px;">
                    <a href="#"
                      style="display:inline-block; background:#22c55e; color:#ffffff;
                      padding:12px 28px; text-decoration:none; border-radius:6px;
                      font-size:15px;">
                      확인하기
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f8fafc; padding:20px; text-align:center;
                  font-size:12px; color:#94a3b8;">
                  © 2026 새싹 프로젝트 · Node Mailer
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </div>
    `
};


transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        console.error(error);
    }
    else{
        console.log('이메일 전송 성공: ', info)// info.response
    }
});