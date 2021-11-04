module.exports = {
    name: "ping",
    aliases: ["ping"],
    inVoiceChannel: true,
    run: async (client, message, args) => {

            message.channel.send(`PONG!`)
        }
    }
  



