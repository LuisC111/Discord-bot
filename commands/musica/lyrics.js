const { Util, MessageEmbed } = require('discord.js');
const soleno = require('solenolyrics');

module.exports = {
    name: "lyrics",
    aliases: ["letra"],
    run: async (client, message, args) => {

        const search = args?.join(' ');

        if (!search) {
            message.channel.send(`${client.emotes.error} Escribe el nombre de una canción...`);
            return;
        }
        
        const [ lyrics, icon, title, author ] = await Promise.all([
            soleno.requestLyricsFor(search),
            soleno.requestIconFor(search),
            soleno.requestTitleFor(search),
            soleno.requestAuthorFor(search)
        ]);

        const embed = new MessageEmbed()
            .setTitle(title)
            .setAuthor(author, icon)
            .setThumbnail(icon)
            .addField('Comando en fase BETA', "(Propenso a errores de busqueda)")
            .setColor('RANDOM');
        
        for (const song of Util.splitMessage(lyrics)) {
            embed.setFooter(song);
            message.channel.send({ embeds: [embed] });
        }

    }
}