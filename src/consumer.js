import amqplib from 'amqplib'
import PlaylistSongService from './service/playlistSongService.js'
import MailSender from './MailSender.js'
import Listener from './Listener.js'
import dotenv from 'dotenv'
dotenv.config()

const initConsumer = async () => {
  const playlistSongService = new PlaylistSongService()
  const mailSender = new MailSender()
  const listener = new Listener(playlistSongService, mailSender)

  const connection = await amqplib.connect(process.env.RABBITMQ_SERVER)
  const channel = await connection.createChannel()

  await channel.assertQueue('export:playlist', {
    durable: true
  })

  channel.consume('export:playlist', listener.listen, { noAck: true })
}

initConsumer()
