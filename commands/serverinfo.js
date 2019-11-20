const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var serverIcon = message.guild.iconURL;

    var serverEmbed = new discord.RichEmbed()
        .setThumbnail(serverIcon)
        .setColor("#d512e2")
        .setDescription("Info over deze server")
        .addField("Gejoined op:", message.member.joinedAt)
        .addField("Aantal members:", message.guild.memberCount);

    return message.channel.send(serverEmbed);

}

module.exports.help = {

    name: "serverinfo"

}