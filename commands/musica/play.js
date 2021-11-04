const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "play",
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {

    let search = args.join(' ');
    let channel = message.member.voice.channel;

    if (!channel) {
      message.react('🙄');
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#FFA400')
            .setDescription(`>>> Primero entra a un canal de voz`)
            .setFooter(
              `${message.author.username}`,
              message.author.displayAvatarURL({ dynamic: true })
            ),
        ],
      });
    }

    if (!search) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#FFA400')
            .setDescription(`>>> Escribe el nombre de la canción o pon un link`)
            .setFooter(
              `${message.author.username}`,
              message.author.displayAvatarURL({ dynamic: true })
            ),
        ],
      });
    } else {
      message.react('✅');
    }

    client.distube.play(message, search);

  }
}