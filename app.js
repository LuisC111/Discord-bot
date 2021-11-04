const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js')
const Distube = require('distube').default;
const client = new Discord.Client({
  intents: 641,
});
const fs = require('fs');
let {readdirSync} = require('fs');
const { join } = require('path');
const express = require("express"); 
const chalk = require("chalk");
let mysql = require('mysql');
const colors = require('./colors.json')
const gstranscript = require('gs-transcript')
const SpotifyPlugin = require("@distube/spotify")


client.ticketcooldown = new Set()

client.config = require('./config.js'); 

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = client.config.emoji
client.categories = new Discord.Collection();


const distube = new Distube(client, {
  emitNewSongOnly: false,
  searchSongs: 0,
});

client.distube = distube;
// CONTROLADOR DE COMANDOS BASIC
/*
for(const file of readdirSync('./comandos/')) { 

  if(file.endsWith(".js")) { 
  let fileName = file.substring(0, file.length - 3); 
  let fileContents = require(`./comandos/${file}`); 
  client.comandos.set(fileName, fileContents);
  }
}
*/







//CONTROLADOR COMANDOS OP
const commandsS = readdirSync('./commands');//lees el directorio
for (const dir of commandsS) {
  const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
    file.endsWith(".js")//como es un bucle interara por cada categoria y harias un filtro para solo los archivos con extension js o puedes cambiarlo dependiendo de tu archivo
  );
  for (const file of commands) {
    let fileName = file.substring(0, file.length - 3); 
    const cmd = require(`./commands/${dir}/${file}`);//los requieres
    client.commands.set(cmd.name, cmd);
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  }
}

// CONTROLADOR DE EVENTOS 

for(const file of readdirSync('./eventos/')) { 

    if(file.endsWith(".js")){
    let fileName = file.substring(0, file.length - 3); 
    let fileContents = require(`./eventos/${file}`); 
    try {
    client.on(fileName, fileContents.bind(null, client)); 
    } catch (e) {
      console.log('el archivo que da error => ' + file)
    }
    delete require.cache[require.resolve(`./eventos/${file}`)]; 
    }
  }




//Base de datos
const app = express(); 
const port = process.env.PORT || 30000; 
const dbConnection = require("./db.js");

app.listen(port, (req, res) => {
    dbConnection().connect(function(err){ 
        if(err) { 
            console.error(err.stack)
            return;
        }

        console.log(chalk.yellow("Conectado a la base de datos"))
        
    });
    console.log(chalk.yellow("\nServidor abierto en el puerto "+ port))
});








// ********************************DISTUBE PROGAMMING****************************************

const status = (queue) =>
  `Volumén: \`${queue.volume}%\` | Filtro: \`${
    queue.filters.join(', ') || 'Apagado'
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? 'Toda la cola'
        : 'Esta canción'
      : 'Apagado'
  }\` | Autoplay: \`${queue.autoplay ? 'Encendido' : 'Apagado'}\``;

// DisTube event listeners, more in the documentation page
distube
  .on('playSong', (queue, song) => {
  let playEmbed = new MessageEmbed()
    .setColor('#aaf700')
    .setTitle(`🎵 Sonando `)
    .setThumbnail(song.thumbnail)
    .setDescription(`[${song.name}](${song.url})`)
    .addField('Pedido por', `${song.user}`, true)
    .addField('Duración', `${song.formattedDuration.toString()}`, true)
    .setFooter(status(queue), song.user.displayAvatarURL({ dynamic: true }));

  queue.textChannel.send({ embeds: [playEmbed] });
  })
  .on('addSong', (queue, song) => {
    let playEmbed = new MessageEmbed()
      .setColor('#FFA400')
      .setTitle(`🎵 Agregado a la cola`)
      .setThumbnail(song.thumbnail)
      .setDescription(`[${song.name}](${song.url})`)
      .addField('Pedido por', `${song.user}`, true)
      .addField('Duración', `${song.formattedDuration.toString()}`, true)
      .setFooter(`Sonara pronto...`, song.user.displayAvatarURL({ dynamic: true }));

    queue.textChannel.send({ embeds: [playEmbed] });
  })
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `Agregada \`${playlist.name}\` playlist (${
        playlist.songs.length
      } canciones) en cola\n${status(queue)}`
    )
  );




//Login:


client.login(client.config.token)
    .then(() => {
    })
    .catch((err) => {
        console.error("Error al loguear: "+err)
    });
    