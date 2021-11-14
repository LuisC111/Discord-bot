const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "serveravatar",  
  aliases: ["savatar"], 
  cooldown: 5, 
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      message.reply({embeds: [new Discord.MessageEmbed()
      .setAuthor(`Avatar De: ${message.guild.name}`, message.guild.iconURL({dynamic: true}),)
      
      .addField("❱ PNG",`[\`LINK\`](${message.guild.iconURL({format: "png"})})`, true)
      .addField("❱ JPEG",`[\`LINK\`](${message.guild.iconURL({format: "jpg"})})`, true)
      .setURL(message.guild.iconURL({
        dynamic: true
      }))
      
      .setImage(message.guild.iconURL({
        dynamic: true, size: 256,
      }))
    ]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({embeds: [new MessageEmbed()
         
          .setTitle(`❌ ERROR`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
      ]});
    }
  }
}