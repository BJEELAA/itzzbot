const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij mag dit niet doen :<");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.reply("Geef een gebruiker op/gebruiker niet op deze server");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, je mag deze persoon niet muten");

    var muteRank = message.guild.roles.find("name", "muted");

    if (!muteRank) return message.reply(`De rank muted bestaat niet`);

    var muteTime = args[1];

    if (!muteTime) return message.reply("Geef een tijd mee");

    await (user.addRole(muteRank.id));

    message.channel.send(`${user} is gemuted voor ${muteTime}`);

    setTimeout(function () {

        user.removeRole(muteRank.id);

        message.channel.send(`${user} is geunmuted`);

    }, ms(muteTime));

}

module.exports.help = {

    name: "tempmute"

}