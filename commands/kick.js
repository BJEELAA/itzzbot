const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(args[0]));

    if (!kickUser) return message.reply(`Gebruiker is niet gevonden`);

    var reason = args.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij mag dit niet doen (als dit niet klopt, stuur je me maar een berichtje)");

    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Geen staff kicken...");

    var kick = new discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#ee0000")
        .addField("Gekicked: ", kickUser)
        .addField("Gekicked door: ", message.author)
        .addField("Reden: ", reason);

    var kickChannelText = "straffen"

    var kickChannel = message.guild.channels.find("name", kickChannelText);

    if (!kickChannel) return message.reply(`Het kanaal ${kickChannelText} bestaat niet`);

    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick);

    message.channel.send(`${kickUser} is succesvol gekicked met reden ${reason}`);

    return;

}

module.exports.help = {

    name: "kick"

}