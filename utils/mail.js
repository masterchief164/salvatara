const nodemailer = require('nodemailer')
const config = require('../config/config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'salvatarainc@gmail.com',
    pass: config.MAIL_APP_PASSWORD
  }
})
 
exports.sendMail = function (toMail, subject, message) {
  const mailOptions = {
    from: 'salvatarainc@gmail.com',
    to: toMail,
    subject: subject,
    html: message
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}