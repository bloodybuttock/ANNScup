import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

class SMTPemail {
  static _idActivation(req, res, next) {
    dotenv.config();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Password,
      },
    });
    var jwtSecret: any = process.env.JWT_Activate;
    const verifyingToken = jwt.sign(
      {
        username: req.bodyusername,
      },
      jwtSecret
    );

    let mailOptions = {
      from: process.env.Email,
      to: req.body.email,
      subject: "ANN cup Account Activation",
      html: `       
            <div class="container" style="margin-left:20em; margin-top:2em;" >
                <img src="https://i.imgur.com/hB2n7OL.jpg" style="width: 40em; border-radius: 1em ; margin-bottom:0em;" alt="">
                <div style="background-color:#141414;border-radius: 1em; margin-top:0em; width:40em;">
                  <h4 style="color:cyan; word-wrap: break-word; width: 35em; padding:1em;">${verifyingToken}</h4>
                </div>
            </div>
        `,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        res.json({ Error: err });
      } else next();
    });
  }
}

export default SMTPemail;
