module.exports = {
    name: "volume",
    aliases: ["volumen", "v", "vol"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
  
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | ¡No hay nada en la cola ahora mismo!`)
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | ¡Ingresa un número valido!`)
        if (volume > 500) return message.channel.send(`${client.emotes.error} | ¡El volumen no puede ser mayor a 500!`)
        if (volume < 1) return message.channel.send(`${client.emotes.error} | ¡El volumen no puede ser menor a 1!`)

        queue.setVolume(volume)


        message.channel.send(`${client.emotes.success} | Volumen establecido a \`${volume}\``)

    }
  }