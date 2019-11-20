const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args, prefix) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij mag dit niet doen :<");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!user) return message.reply("Geef een gebruiker op/gebruiker niet op deze server");

    if(user.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, je mag deze persoon niet warnen");

    var reason = args.join(" ").slice(22);

    if(!reason) return message.reply("Geef een reden op");

    if(!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) =>{

        if(err) console.log(err);

    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("Warn")
        .setColor("#ee0000")
        .addField("Gewarned: ", user)
        .addField("Gewarned door: ", message.author)
        .addField("Aantal warns: ", warns[user.id].warns)
        .addField("Reden: ", reason);

    var warnChannelText = "straffen"

    var warnChannel = message.guild.channels.find("name", warnChannelText);

    if (!warnChannel) return message.reply(`Het kanaal ${warnChannelText} bestaat niet`);

    warnChannel.send(warnEmbed);

    message.channel.send(`${user} is succesvol gewarned met reden ${reason}`);

    if(warns[user.id].warns === 3) {

        message.channel.send(`${user}, LET OP! Als je nog 1 warn krijgt word je verbannen!!`);

    } else if(warns[user.id].warns === 4) {

        message.guild.member(user).ban(reason);

        message.reply(`${user} is verbannen, omdat hij/zij nu al 4 warns heeft`);

    };

}

module.exports.help = {

    name: "warn"

}