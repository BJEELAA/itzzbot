const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setThumbnail(botIcon)
        .setColor("#d512e2")
        .setDescription("ItzzBot")
        .addField("Naam van de bot:", bot.user.username)
        .addField("Gemaakt op:", bot.user.createdAt);

    return message.channel.send(botEmbed);

}

module.exports.help = {

    name: "botinfo"

}