import nodemailer from 'nodemailer'

class MailSender {
  constructor () {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD
      }
    })
  }

  sendEmail (targetEmail, playlistId, playlistName, content) {
    const message = {
      from: process.env.MAIL_ADDRESS,
      to: targetEmail,
      subject: `Ekspor lagu playlist - ${playlistName}`,
      text: `Berikut hasil ekspor lagu pada playlist ${playlistName}`,
      attachments: [
        {
          filename: `${playlistId}.json`,
          content
        }
      ]
    }

    return this._transporter.sendMail(message)
  }
}

export default MailSender
