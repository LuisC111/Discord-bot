module.exports = {
    name: "ban",
    description: "Este comando banea a un usuario mencionado",
    run: async(client, message, args, discord)=> {

        if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send('¡No tienes permiso para usar este comando!') 
        if(!message.guild.me.permissions.has('BAN_MEMBERS')) return message.channel.send('¡No tengo permiso para usar este comando!')

        const member = message.mentions.members.first();
        if(!member) return message.channel.send('¡Debes mencionar a una persona!') 

        const reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send('¡Debes dar una razón de baneo!') 
        if(member.id === message.author.id) return message.channel.send('¡No te puedes autobanear!') 
        if(member.permissions.has('BAN_MEMBERS')) return message.channel.send('¡No puedes banear a esta persona!') 

        member.ban({reason: reason})
        .then(() => { return message.channel.send(`${message.author} ha baneado a ${member}. Razón del ban: ${reason}`) })
        .catch(() => { return message.channel.send('¡No se ha encontrado al usuario!') })

    }};