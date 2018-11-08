const Discord = require("discord.js");
const Utils = require('../modules/utils.js');


exports.run = (client, message, args) => {
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('./json/items.json', 'utf8'));

    var target = Utils.FindTarget(args);
    const filter = response => {
        return !isNaN(parseInt(response.content));
    };

    if (args[0] == '*') {
        message.reply(Utils.EmbedList(client, json));
    }
    else {
        let results = Utils.FuzzySort(target, json);
        if (results.length <= 0)
            message.reply(Utils.ErrorWrong(client));
        console.log(target);
        console.log(results[0].obj.name.toLowerCase());      
        if (results[0].obj.name.toLowerCase() == target)
            message.reply(EmbedMessage(client, results[0].obj))
                .catch(err => console.log(err));
        else {
            message.reply(Utils.DidYouMeanEmbed(client, Utils.SearchMessage(results)))
                .then(() => {
                    message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
                        .then(collected => {
                            // console.log(`collected is ${(collected.first())}`);
                            message.reply(EmbedMessage(client, results[parseInt(collected.first()) - 1].obj)).catch(err => console.log(err));
                        })
                        .catch(collected => {
                            message.reply(Utils.ErrorWrongNumber(client));
                        })
                        .catch(err => console.log(err));
                });
        }
    }
}
function EmbedMessage(client, target) {
    if (target.itemtype == "Armor") {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("Name", target.name)
            .addField("Base AC", target.baseac)
            .addField("Dex Pen", target.dexpen)
            .addField("DR", target.dr)
            .addField("Type", target.type)
            .addField("Max Dex", target.maxdex)
            .addField("Cost", target.cost);
        return embed;
    }
    if (target.itemtype == "Weapon") {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("Name", target.name)
            .addField("Damage", target.damage)
            .addField("Type", target.type)
            .addField("Reach/Range", target.range)
            .addField("Cost", target.cost)
            .addField("Properties", target.properties)
            .addField("Special", target.special);
        return embed;
    }
}
