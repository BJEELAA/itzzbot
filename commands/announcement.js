const discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {

    // PREFIXannounce Titel // bericht // kleur // kanaal

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij mag dit niet :<");

    var splitser = "//";

    if (args[0] == null) {

        var announceUsage = new discord.RichEmbed()
            .setTitle("Gebruik")
            .setColor("#00ee00")
            .setDescription(`Maak een announcement door gebruik te maken van: \n\n ${prefix}announce Titel ${splitser} Bericht ${splitser} Kleur (bijv. #00ee00) ${splitser} Kanaal`);

        return message.channel.send(announceUsage);

    }

    args = args.join(" ").split(splitser);

    if (args[2] == undefined) args[2] = "#eeeeee";
    if (args[3] == undefined) args[3] = "announcements";


    var options = {

        titel: args[0] || "Melding",
        bericht: args[1] || "Geen inhoud opgegeven",
        kleur: args[2].trim(),
        kanaal: args[3].trim()

    }

    var announcer = message.author;

    var announceEmbed = new discord.RichEmbed()
        .setTitle("Announcement")
        .setColor(options.kleur)
        .setDescription(`Bericht van ${announcer} \n\n ${options.titel} \n\n ${options.bericht} \n`)
        .setTimestamp();

    var announceChannel = message.guild.channels.find(`name`, options.kanaal);
    if(!announceChannel) return message.reply("Het kanaal bestaat niet");

    announceChannel.send(announceEmbed);
    message.channel.send(`Announcement succesvol gestuurd in ${announceChannel}`);

}

module.exports.help = {

    name: "announce"

}