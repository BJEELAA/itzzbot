const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const fortnite = require("fortnite");
const apiKey = require("../key.json");

module.exports.run = async (bot, message, args, prefix) => {

    if (!args[0]) return message.reply(`Gebruik: ${prefix}report Gebruiker Reden`);

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.reply(`Geef een geldige speler op`);

    var reason = args.join(" ").slice(22);

    if (!reason) return message.reply(`Gelieve een reden op te geven`);

    var reportEmbed = new discord.RichEmbed()
        .setDescription("Report")
        .setColor("#ff0000")
        .addField("Gereporte user: ", `${user} met het ID ${user.id}`)
        .addField("Gereport door: ", `${message.author} met het ID ${message.author.id}`)
        .addField("Reden: ", reason)
        .setFooter(message.createdAt);

    var reportChannel = message.guild.channels.find("name", "report");

    if(!reportChannel) return message.reply("Het report kanaal is niet gevonden");

    message.delete();

    return reportChannel.send(reportEmbed);

}

module.exports.help = {

    name: "report"

}