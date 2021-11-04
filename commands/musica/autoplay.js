
module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
  
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | ¡No hay nada en la cola ahora mismo!`)
        try {
            const autoplay = queue.toggleAutoplay()
            message.channel.send(`${client.emotes.success} | Reproducción automatica: \`${autoplay ? "Encendido" : "Apagado"}\``)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | ${e}`)
        }
  
    }
  }