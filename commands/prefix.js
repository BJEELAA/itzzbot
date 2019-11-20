const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Dit mag jij volgens mij niet ;)");

    if (!args[0]) return message.reply("Geef een prefix mee");

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    prefixes[message.guild.id] = {

        prefixes: args[0]

    };

    fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes), (err) => {

        if (err) console.log(err);

    });

    var prefixEmbed = new discord.RichEmbed()
        .setColor("f00")
        .setTitle("Prefix")
        .setDescription(`Prefix aangepast naar ${args[0]}`);
    
    message.channel.send(prefixEmbed);

}

module.exports.help = {

    name: "prefix"

}