const Discord = require("discord.js");
const mysql = require("mysql");

module.exports = async (client, message, args) => {

    const db = mysql.createConnection({
        host: client.config.host,
        user: client.config.user,
        database: client.config.database
    });

    const prefixUser = args.join(" ");
    const usuario = message.author.id;
    const servidor = message.guild.id;

    db.query(`INSERT INTO prefix (serverId, prefix) VALUES ('${servidor}', '${prefixUser}')`, 
    async function (err, rows){

        if(err) return console.log('Hubo un error al intentar consultar un dato '+err)
        if(!err) return message.channel.send("Exito!");
        

    })

    db.query(`SELECT * FROM prefix WHERE serverId = ${servidor}`, 
    async function (err, rows){

    if(err) return console.log('Hubo un error al intentar consultar un dato '+err)

      let elprefix = rows[0].prefix;
      let elid = rows[0].serverId;
      message.channel.send(elprefix);
      message.channel.send(elid);
    })
  

}



