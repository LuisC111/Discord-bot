module.exports = {
    name: "pause",
    aliases: ["pausar", "hold"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | ¡No hay nada en la cola ahora mismo!`)
        if (!queue.playing) return message.channel.send(`${client.emotes.error} | ¡No hay nada reproduciendo ahora mismo!`)
        if (queue.playing.paused) return message.channel.send(`${client.emotes.error} | ¡Ya está pausado!`)
        
        queue.pause()
        message.channel.send(`${client.emotes.stop} | Pause la canción para ti :)`)
    }
}