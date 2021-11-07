const {MessageEmbed} = require('discord.js');
const distube = require('distube');
let mysql = require('mysql');


module.exports = async (client, message) => {
    
    if (message.author.bot) return;
    if (!message.guild) return;
    
    const db = mysql.createConnection({
        host: client.config.host,
        user: client.config.user,
        database: client.config.database
    });  

    const server = message.guild.id;

    db.query(`SELECT * FROM prefix WHERE serverId = '${server}'`, async (err, rows) => {
        if (err) throw err;
        const prefix = rows.length <= 0 ? client.config.prefix : rows[0].prefix;
    

    

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (message.content.match(new RegExp(`^<@!?${message.client.user.id}>( |)$`))) {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Hola! **${message.author.tag}**, mi prefix es **${prefix}**.\nUsa **${prefix}help** para obtener una lista con mis comandos!`);
        return message.channel.send({ embeds: [embed] });
    }

    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`${client.emotes.error} | Debes estar en un canal de voz!`)
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.reply(`Error: ${e}`)
    }
    })
};
  