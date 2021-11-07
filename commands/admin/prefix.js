const { MessageEmbed } = require('discord.js');
const mysql = require('mysql');

module.exports = {
    name: "prefix",
    aliases: ["prefijo"],
    run: async (client, message, args) => {

    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("¡Necesitas tener permiso de administrador para usar esto!");

    const db = mysql.createConnection({
        host: client.config.host,
        user: client.config.user,
        database: client.config.database
    });     

    const server = message.guild.id;
    let bot = client.config.botId;

    db.query(`SELECT * FROM prefix WHERE serverId = '${server}'`, (err, rows) => {
        if(err) throw err;

        const prefix = client.config.prefix;

        if(args[0] == " " || args[0] == undefined || args[0] == "NaN" || args[0] == "null" || args[0].length >= 10 || args[0].length <= 0)  {
            message.react('🙄');
                message.reply({
                  embeds: [
                    new MessageEmbed()
                      .setColor('RED')
                      .setDescription(`>>> Ingresa un prefix valido`)
                      .addField('Prefix actual:', ''+rows.length <= 0 ? prefix : rows[0].prefix)
                      .setFooter(
                        `${message.author.username}`,
                        message.author.displayAvatarURL({ dynamic: true })
                      ),
                  ],
            });
            return;
        } else{

        if(rows.length <= 0){
            db.query(`INSERT INTO prefix (serverId, prefix) VALUES ('${server}','${args[0]}')`, (err, rows) => {
                if(err) throw err;
                message.react('✅');
                message.reply({
                    embeds: [
                      new MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`>>> Prefix agregado, nuevo prefix: **${args[0]}**`)
                        .setFooter(
                          `${message.author.username}`,
                          message.author.displayAvatarURL({ dynamic: true })
                        ),
                    ],
              });
            });
        }else if(rows.length >= 1){
           
        if(rows[0].prefix == args[0]) return message.channel.send("Este prefix ya está configurado.");
      
        db.query(`UPDATE prefix SET prefix = '${args[0]}' WHERE serverId = '${server}'`);
        message.react('✅');
        message.reply({
            embeds: [
              new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`>>> Prefix actualizado, nuevo prefix: **${args[0]}**`)
                .setFooter(
                  `${message.author.username}`,
                  message.author.displayAvatarURL({ dynamic: true })
                ),
            ],
      });
    }
    }
    });
    
    }
}