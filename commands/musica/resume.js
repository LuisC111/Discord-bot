module.exports = {
    name: "resume",
    aliases: ["resumir", "unpause"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | ¡No hay nada en la cola ahora mismo!`)

        queue.resume()
        message.channel.send(`${client.emotes.stop} | Despause la canción para ti :)`)
    }
}