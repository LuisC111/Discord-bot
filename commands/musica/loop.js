module.exports = {
    name: "repeat",
    aliases: ["loop", "rp", "ciclo"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | ¡No hay nada en la cola ahora mismo!`)
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "Off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "cancion":
                mode = 1
                break
            case "cola":
                mode = 2
                break
            case "queue":
                mode = 2
                break
        }
        if (mode === null) return message.channel.send(`${client.emotes.error} | ¡Debes especificar un modo de repetición ('off', 'cancion', 'cola')!`)
        if (!mode == 0 || !mode == 1 || !mode == 2) return message.channel.send(`${client.emotes.error} | ¡Debes especificar un modo de repetición ('off', 'cancion', 'cola')!`)
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode === 2 ? "Repetir cola" : "Repetir canción" : "Off"
        message.channel.send(`${client.emotes.repeat} | Modo ciclo puesto en: \`${mode}\``)
    }
}