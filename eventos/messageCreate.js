const discord = require('discord.js');
let mysql = require('mysql');


module.exports = async (client, message) => {
    
    let prefix = client.config.prefix;
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    

    if(!message.content.startsWith(client.config.prefix)) return; 

    let cmd = client.comandos.get(command); 
    if(!cmd) return; 
    cmd(client, message, args);

};
  