const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(args[0]));

    if (!banUser) return message.reply(`Gebruiker is niet gevonden`);

    var reason = args.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij mag dit niet doen (als dit niet klopt, stuur je me maar een berichtje)");

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Geen staff bannen...");

    var ban = new discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#ee0000")
        .addField("Gebanned: ", banUser)
        .addField("Gebanned door: ", message.author)
        .addField("Reden: ", reason);

    var banChannelText = "straffen"

    var banChannel = message.guild.channels.find("name", banChannelText);

    if (!banChannel) return message.reply(`Het kanaal ${banChannelText} bestaat niet`);

    message.guild.member(banUser).ban(reason);

    banChannel.send(ban);

    message.channel.send(`${banUser} is succesvol gebanned met reden ${reason}`);

    return;

}

module.exports.help = {

    name: "ban"

}