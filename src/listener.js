import autoBind from 'auto-bind'

class Listener {
  constructor (playlistService, mailSender) {
    this._playlistService = playlistService
    this._mailSender = mailSender

    autoBind(this)
  }

  async listen (message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString())

      const playlist = await this._playlistService.getPlaylistSongs(playlistId)

      const result = await this._mailSender.sendEmail(
        targetEmail,
        playlistId,
        playlist.name,
        JSON.stringify({ playlist })
      )

      console.log(result)
      console.log(JSON.stringify({ playlist }))
    } catch (error) {
      console.log(error)
    }
  }
}

export default Listener
