const { MessageEmbed } = require("discord.js");

module.exports= {
    name: "say",
    description: "El bot repetirá lo que escribas",
    run: async(client, message, args , discord) =>{
 
        const say = args.join(" ");
        if(!say) return message.channel.send('¡Debes escribir algo!')

        const sayembed = new MessageEmbed()
        .setColor("COLOR")
        .setDescription(say)

        message.channel.send({ embeds: [sayembed] })

    }
};