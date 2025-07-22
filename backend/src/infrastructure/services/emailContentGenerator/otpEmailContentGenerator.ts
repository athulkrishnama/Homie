import { IOtpEmailContentGenerator } from "../../../domain/interfaces/service/emailContentGenerators/IOtpEmailContentGenerator";

export class OtpEmailContentGenerator implements IOtpEmailContentGenerator {
  generateTemplate(otp: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Your OTP Code</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          background-color: #ffffff;
          margin: 50px auto;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }
        .otp {
          font-size: 32px;
          font-weight: bold;
          color: #2c3e50;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p>Your OTP for verification is:</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for only 10 minutes. Do not share it with anyone.</p>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Homie. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `
  }
}