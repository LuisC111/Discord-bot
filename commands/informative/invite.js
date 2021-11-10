const {
    MessageEmbed
  } = require("discord.js");

 
  module.exports = {
    name: "invite", 
      aliases: ["add"], 

   
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
      try {
          
        message.reply(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
      } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.reply({embeds: [new MessageEmbed()
          
            .setTitle(`❌ ERROR`)
            .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]});
      }
    }
  }