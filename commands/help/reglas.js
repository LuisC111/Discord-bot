const Discord = require("discord.js");
module.exports = {
  name: "reglas",
  aliases: ["rules"],
  run: async(client, message, args, discord) => {
   
    const btn = new Discord.MessageButton()
  
      .setCustomId("acp")
      .setLabel("Acepto")
      .setStyle("SUCCESS");
    const btn2 = new Discord.MessageButton()
      .setCustomId("deg")
      .setLabel("No Acepto")
      .setStyle("DANGER");
 
    const fila = new Discord.MessageActionRow().addComponents(btn, btn2);

  

    const msgE = {
      title: "Reglas",
      description: "Estas son las reglas de tu canal",
      color: 65535,
      author: {
        name: "servidor",
        icon_url: "",
      },
    };

   

    message.channel.send({ embeds: [msgE], components: [fila] });
  },
};
