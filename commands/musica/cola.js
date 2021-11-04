const ytdl = require("ytdl-core");
const distube = require('distube').default;
const yrS = require("yt-search");
const { joinVoiceChannel } = require('@discordjs/voice');
const {MessageEmbed} = require('discord.js');



module.exports = {
  name: "cola",
  aliases: ["queue"],
  inVoiceChannel: true,
  run: async (client, message, args) => {

    const queue = client.distube.getQueue(message.guildId);

    // let playEmbed = new MessageEmbed().setColor('#FFA400');

    if (!queue) {
      message.channel.send('No hay nada sonando ahora mismo!');
    } else {
      message.channel.send(
        `Cola actual:\n${queue.songs
          .map(
            (song, id) =>
              `**${id ? id : 'Sonando'}**. ${song.name} - \`${
                song.formattedDuration
              }\``
          )
          .slice(0, 10)
          .join('\n')}`
      );
    }

  }
}