const { MessageEmbed } = require("discord.js");
module.exports = {
   name: "eval",
   aliases: ["e"],
   cooldowns: 3000,
   description: "Evaluar Code",
   usage: "<code>",
   toggleOff: false,
   developersOnly: true,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   description: "Evaluate a given code!",

   run: async (client, message, args) => {
      try {
         const code = args.join(" ");
         if (!code) {
            return message.channel.send("¡Proporcione un código para evaluar!");
         }
         let evaled = eval(code);

         if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

         let embed = new MessageEmbed()
            .setAuthor("Eval", message.author.avatarURL())
            .addField("Input", `\`\`\`${code}\`\`\``)
            .addField("Output", `\`\`\`${evaled}\`\`\``)
            .setColor("BLUE");

         message.channel.send({ embeds: [embed] });
      } catch (err) {
         message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
      }
   },
};