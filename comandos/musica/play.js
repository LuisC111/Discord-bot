const ytdl = require("ytdl-core");
const yrS = require("yt-search");
const {
    AudioPlayer,
    StreamType,
    createAudioPlayer,
    createAuduioResource,
    joinVoiceChannel,
} = require("@discordjs/voice");





module.exports= {
    name: "play",
    description: "Reproduce una cancion ",
    options: [{
        name: "cancion",
        description: "Cancion - Autor y cancion - Autor",
        type: "STRING",
        required: "true",

    },
],
    permissions: [""],
    run: async (client, message, args) => {
        const vc = message.member.voice.channel;
        if(!vc){
            return message.replay({
                content: "Tienes que estar en un canal de voz",
                ephemeral: true,
            });
        }
        message.play({
            content: "Reproduciendo: Nombre",
            
        });
    },
};
