const Discord = require("discord.js");
const fuzzysort = require('fuzzysort');

FindTarget = (args) => {
    var target = "";
    args.forEach(element => {
        target += element + " ";
    });
    target = target.toLowerCase().trim();
    return target;
}
const filter = response => {
    var check = !isNaN(parseInt(response.content));
    if (check) {
        return check;
    }
    else if (response.content == "c") {
        return response.content == "c";
    }
};
EmbedList = (client, json) => {
    var list = "";
    var list2 = "";
    json.forEach(element => {
        if (list.length < 1000) {
            if (element.type != "")
                list += `${element.name} (${element.type}) \n`;
            else list += `${element.name} \n`;
        }
        else if (list2.length < 1000 && list.length > 1000) {
            if (element.type != "")
                list2 += `${element.name} (${element.type}) \n`;
            else list2 += `${element.name} \n`;
        }
    });
    if (list2 == "") {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("List: ", list);
        return embed;
    }
    else {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("List: ", list)
            .addField("List continued: ", list2);
        return embed;
    }

}
FuzzySort = (target, json) => {
    const options = {
        limit: 5, // don't return more results than you need!
        allowTypo: true, // if you don't care about allowing typos
        threshold: -10000, // don't return bad results
        key: 'name'
    }
    var results = fuzzysort.go(target, json, options)
    return results;
}
DidYouMeanEmbed = (client, searchmessage) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Did you mean?: ", searchmessage + '\n' + "Reply with your choice");
    return embed;
}
SearchMessage = (results) => {
    var counter = 1;
    var searchmessage = "";
    results.forEach(element => {
        searchmessage += counter + ":" + element.obj.name + '\n';
        counter++;
    })
    searchmessage += "You can also reply 'c' to cancel \n";
    return searchmessage;
}
ErrorWrongNumber = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Error", "Not a valid request please try again")
    return embed;
}
ErrorWrong = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Error", "Not a valid request please try again")
    return embed;
}
SelectionCancelled = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Cancelled", "Your selection has been cancelled")
    return embed;
}
//for the majority of small cases this will be fine
EmbedMessage = (client, target, name) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Name: ", target.name)
    switch (name) {
        case "actions" || "conditions" || "curses" || "traits":
            embed.addField("Description", target.text);
            break;
        case "classes":
            embed.addField(target.ability1, target.text1)
                .addField(target.ability2, target.text2)
                .addField(target.ability3, target.text3)
                .addField(target.ability4, target.text4)
                .addField(target.ability5, target.text5)
            if (target.ability6 != "")
                embed.addField(target.ability6, target.text6);
            break;
        case "feats":
            embed.addField("Prerequisite: ", target.prerequisite)
                .addField("Description", target.text);
            break;
        case "glyphs":
            embed.addField("Power: ", target.power)
                .addField("Description: ", target.text);
            break;
        case "items":
            if (target.itemtype == "Armor") {
                embed.addField("Base AC", target.baseac)
                    .addField("Dex Pen", target.dexpen)
                    .addField("DR", target.dr)
                    .addField("Type", target.type)
                    .addField("Max Dex", target.maxdex)
                    .addField("Cost", target.cost);
            }
            else if (target.itemtype == "Weapon") {
                embed.addField("Damage", target.damage)
                    .addField("Type", target.damagetype)
                    .addField("Reach/Range", target.range)
                    .addField("Cost", target.cost)
                    .addField("Properties", target.properties)
                    .addField("Special", target.special);
            }
            break;
        case "races":
            if (target.type == "special") {
                embed.addField("Races Allowed", target.race)
                    .addField("Stat Bonus", target.stat)
                    .addField("Flaw", target.flaw)
                    .addField("Bonus", target.bonus);
            }
            else {
                embed.addField("Race Bonus", target.stat)
                    .addField("Subrace Bonus", target.substat)
                    .addField("Skills Bonus", target.skill)
                    .addField("Flaw", target.flaw)
                    .addField("Bonus", target.bonus);
            }
            break;
        case "secrets":
            embed.addField("Text", target.text)
                .addField("Invocation", target.invocation)
                .addField("Ritual", target.ritual)
                .addField("First Mastery", target.firstmastery, true)
                .addField("Second Mastery", target.secondmastery, true)
                .addField("Third Mastery", target.thirdmastery, true)
                .addField("Final Mastery", target.finalmastery, true);
            break;
        case "spells":
            if (target.type == "ceremony") {
                embed.addField("Secret", target.secret)
                    .addField("Description", target.text)
                    .setImage(target.img);
            }
            else if (target.type == "ritual") {
                embed.addField("Casting Time: ", target.castingtime, true)
                    .addField("Description", target.text);
            }
            else if (target.type == "spell") {
                embed.addField("Time", target.time, true)
                    .addField("Cost", target.cost, true)
                    .addField("Range", target.range, true)
                    .addField("Duration", target.duration, true)
                    .addField("Description", target.text);
            }
            break;
        default:
            break;
    }

    return embed;
}

exports.Generate = async (client, message, args, name) => {
    var fs = require('fs');
    const json = JSON.parse(fs.readFileSync(`./json/${name}.json`, 'utf8'));

    var target = FindTarget(args);

    if (args[0] == '*') {
        message.reply(EmbedList(client, json));
    }
    else {
        let results = FuzzySort(target, json);
        if (results.length <= 0)
            message.reply(ErrorWrong(client));

        else if (results[0].obj.name.toLowerCase() == target)
            message.reply(EmbedMessage(client, results[0].obj, name)).catch(err => console.log(err));
        else {
            message.reply(DidYouMeanEmbed(client, SearchMessage(results)));
            await ClickCollector(client, message, results, name);

        }
    }
}

async function ClickCollector(client, message, results, name) {
    message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
        .then(collected => {
            console.log(`Collected this message: ${collected.first()}`)
            console.log(!isNaN(parseInt(collected.first())));
            if (collected.first() == "c") {
                message.reply(SelectionCancelled(client));
            }
            else if (!isNaN(parseInt(collected.first()))) {
                var id = parseInt(collected.first()) - 1;
                console.log(`I should be sending the results now. The number is ${id}`)
                console.log(`results are  ${results[id].obj.name}`)

                message.reply(EmbedMessage(client, results[id].obj, name)).catch(err => console.log(err));
            }
            else {
                console.log("ERROR ERROR !!!")
            }
        })
        .catch(collected => {
            message.reply(ErrorWrongNumber(client));
        })
}

