const ytdl = require("ytdl-core");
const distube = require('distube').default;
const yrS = require("yt-search");
const { joinVoiceChannel } = require('@discordjs/voice');
const {MessageEmbed} = require('discord.js');



module.exports = {
  name: "skip",
  aliases: ["s"],
  inVoiceChannel: true,
  run: async (client, message, args) => {

let queue = client.distube.getQueue(message.guildId);


if (!message.guild.me.voice.channel) {
  message.react('🙄');
  return message.reply({
    embeds: [
      new MessageEmbed()
        .setColor('RED')
        .setDescription(`>>> No hay nada sonando`)
        .setFooter(
          `${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        ),
    ],
  });
}

if (!queue) {
  message.react('🙄');
  return message.reply({
    embeds: [
      new MessageEmbed()
        .setColor('RED')
        .setDescription(`>>> No hay nada sonando`)
        .setFooter(
          `${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        ),
    ],
  });}



if (queue.songs.length === 0) {
  message.react('🙄');
  return message.reply({
    embeds: [
      new MessageEmbed()
        .setColor('RED')
        .setDescription(`>>> No hay nada sonando`)
        .setFooter(
          `${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        ),
    ],
  });
}
if(queue.songs.length === 1){
  return message.reply({
    embeds: [
      new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`>>> No hay mas canciones en cola. Desconectando...`)
        .setFooter(
          `${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        ),
    ],
  }) && queue.stop();
};

message.react('✅');
return message.reply({
  embeds: [
    new MessageEmbed()
      .setColor('GREEN')
      .setDescription(`>>> Canción saltada.`)
      .setFooter(
        `${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      ),
  ],
}) && queue.skip();





}
}