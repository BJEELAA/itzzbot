const discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix, options) => {

    try{

        var p = prefix;

        var text = `**ItzzBot** \n\n **__Commands__** \n ${p}ban - Ban een speler van de server \n ${p}botinfo - Krijg info over mij \n ${p}hallo - Krijg een berichtje van mij \n ${p}help - Laat dit bericht zien \n ${p}kick - Kick een speler van de server \n ${p}serverinfo - Krijg info over de server \n\n\n De maker van deze bot is: **@BJEELAA#1892**`

        message.author.send(text);

        message.reply("Alle commands staan in je PM");

    }catch (error){

        message.channel.send("404 bliep bloep blap error error :>");

    }

}

module.exports.help = {

    name: "help"

}