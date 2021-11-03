const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
let { readdirSync } = require('fs'); 
const express = require("express"); 
const chalk = require("chalk");
let mysql = require('mysql');
const colors = require('./colors.json')
const gstranscript = require('gs-transcript')


client.ticketcooldown = new Set()

client.config = require('./config.js'); 

client.comandos = new Discord.Collection();  


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
const commandsS = readdirSync('./comandos');//lees el directorio
for (const dir of commandsS) {
  const commands = readdirSync(`./comandos/${dir}/`).filter((file) =>
    file.endsWith(".js")//como es un bucle interara por cada categoria y harias un filtro para solo los archivos con extension js o puedes cambiarlo dependiendo de tu archivo
  );
  for (const file of commands) {
    let fileName = file.substring(0, file.length - 3); 
    const command = require(`./comandos/${dir}/${file}`);//los requieres
    client.comandos.set(fileName, command);
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







//Login:






client.login(client.config.token)
    .then(() => {
    })
    .catch((err) => {
        console.error("Error al loguear: "+err)
    });
    