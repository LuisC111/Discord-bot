const Discord = require("discord.js");
const { Client, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: "reverse",
    description: "revertir un texto",
    run: async(client, message, args, discord)=>{

        if(!args[0]) return message.channel.send("Debes escribir un texto!")

      const revertir = args.join(' ').split('').reverse().join('')

      const embed = new Discord.MessageEmbed()
      .setTitle("La frase que pusiste siendo revertida seria asi:")
      .setDescription(`**${revertir}**`)
      .setColor("RANDOM")

      message.channel.send({ embeds: [embed] })

     }
    }