module.exports = {
    name: "stop",
    aliases: ["disconnect", "leave"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | ¡No hay nada en la cola ahora mismo!`)
        queue.stop()
        message.channel.send(`${client.emotes.success} | ¡Se ha detenido la música!`)
    }
}
    
