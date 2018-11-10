const Discord = require("discord.js");
const fuzzysort = require('fuzzysort');
const filter = response => {
    var check = !isNaN(parseInt(response.content));
    if (check) {
        return check;
    }
    else if (response.content == "c") {
        return response.content == "c";
    }
};
Ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
FindTarget = (args) => {
    var target = "";
    args.forEach(element => {
        target += element + " ";
    });
    target = target.toLowerCase().trim();
    return target;
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
};
FuzzySort = (target, json) => {
    const options = {
        limit: 5, // don't return more results than you need!
        allowTypo: true, // if you don't care about allowing typos
        threshold: -10000, // don't return bad results
        key: 'name'
    }
    var results = fuzzysort.go(target, json, options)
    return results;
};
DidYouMeanEmbed = (client, searchmessage) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Did you mean?: ", searchmessage + '\n' + "Reply with your choice");
    return embed;
};
SearchMessage = (results) => {
    var counter = 1;
    var searchmessage = "";
    results.forEach(element => {
        searchmessage += counter + ":" + element.obj.name + '\n';
        counter++;
    })
    searchmessage += "You can also reply 'c' to cancel \n";
    return searchmessage;
};
ErrorWrongNumber = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Error", "Not a valid request please try again")
    return embed;
};
ErrorWrong = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Error", "Not a valid request please try again")
    return embed;
};
SelectionCancelled = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Cancelled", "Your selection has been cancelled")
    return embed;
};
EmbedMessage = (client, target, name) => {

    var keys = Object.keys(target);
    var values = Object.values(target);

    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp();

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = values[i];
        var inline = value.length < 5;
        if (key == "type")
            continue;
        if (value == "")
            continue;
        if (key == "img")
            embed.setImage(value);
        else {
            embed.addField(Ucfirst(key), value, inline);
        }
    }
    return embed;
};
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
};
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
};

