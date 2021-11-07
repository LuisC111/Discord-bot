const Discord = require("discord.js");
module.exports = {
    name: "clear",
    aliases: ["del", "borrar", "limpiar", "purge"],
  
      run: async(client, message, args, discord) => {

      if (!message.member.permissions.has("MANAGE_MESSAGES")) {
          return message.reply(`${client.emotes.error} No tienes permisos para borrar mensajes....`);
      }

      if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
        return message.reply(`${client.emotes.error} No tengo permisos para borrar mensajes....`);
      }
  
      if (!args[0]) return message.reply(`${client.emotes.error} Ingresa numero de mensajes a borrar`);
      if (isNaN(args[0])) return message.reply(`${client.emotes.error} Ingresa un numero`);
      if (args[0] > 100) return message.reply(`${client.emotes.error} Debe ser un numero menor a 100`);
      if (args[0] < 1) return message.reply(`${client.emotes.error} Debe ser un numero mayor a 0`);
  

      message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${client.emotes.success} **${message.author.username}** Ha eliminado ${args[0]} mensajes`);
      });
      
      /*await message.channel.messages
      .fetch({ limit: args[0] })
      .then((messages) => {
        message.channel.bulkDelete(messages);
      });*/

  }
};
  