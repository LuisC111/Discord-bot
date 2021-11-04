
const chalk = require("chalk");
const Discord = require("discord.js");

module.exports = async  (client, message, args) => {

        let cmds = client.commands.size
        let users = client.users.cache.size
        let servers = client.guilds.cache.size
        let mensajes = ["comando", "comandos", "usuario", "usuarios", "servidor", "servidores"]

        if(cmds >=2 || users >=2 || servers >=2){
		console.log(chalk.cyan(`\nCargando un total de ${cmds} ${mensajes[1]}.`, "log"));
		console.log(chalk.green(`${client.user.tag}`), `Listo para ${users} ${mensajes[3]} en ${servers} ${mensajes[5]}.`, ":D");
        }else{
            console.log(chalk.cyan(`\nCargando un total de ${cmds} ${mensajes[0]}.`, "log"));
            console.log(chalk.green(`${client.user.tag}`), `Listo para ${users} ${mensajes[2]} en ${servers} ${mensajes[4]}.`, ":D");      
        }

        // Actualizar estado cada 20 segundos
		const status = require("../config.js").status,
        version = require("../package.json").version;
    let i = 0;
    setInterval(function(){
        const toDisplay = status[parseInt(i, 10)].name.replace("{serversCount}", client.guilds.cache.size)+" | v"+version;
        client.user.setActivity(toDisplay, {
            type: status[parseInt(i, 10)].type
        });
        if(status[parseInt(i+1, 10)]) i++;
        else i = 0;
    }, 20000); // Cada 20 segundos

    setTimeout(() => {
        console.log(chalk.magenta("\n\nDudas o bugs?"), chalk.bgRed("Fallen#8319 - ₴₱sito#2582"));
    }, 400);

}
 