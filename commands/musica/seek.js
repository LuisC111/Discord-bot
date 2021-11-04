module.exports = {
    name: "seek",
    aliases: ["buscar", "adelantar"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | ¡No hay nada en la cola ahora mismo!`)
        if (!args[0]) return message.channel.send(`${client.emotes.error} | ¡Indique la posición (en segundos) para buscar!`)
        const time = Number(args[0])
        if (isNaN(time)) return message.channel.send(`${client.emotes.error} | ¡Ingresa un número valido!`)
        if (time < 0) return message.channel.send(`${client.emotes.error} | ¡No puedes buscar en un tiempo negativo!`)
        queue.seek(time)
        message.channel.send(`Adelantado al segundo ${time}!`)
    }
}