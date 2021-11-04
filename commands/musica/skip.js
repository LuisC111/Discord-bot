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
  return message.reply(`>>> No hay nada sonando 😶`);
}
console.log(queue)
message.reply(`>>> Canción saltada`) && queue.skip();

}
}