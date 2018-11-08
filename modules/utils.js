const Discord = require("discord.js");
const fuzzysort = require('fuzzysort');

exports.FindTarget = (args) => {
    var target = "";
    args.forEach(element => {
        target += element + " ";
    });
    target = target.toLowerCase().trim();
    return target;
}
exports.EmbedList = (client, json) => {
    var list = "";
    var list2 = "";
    json.forEach(element => {
        if (list.length < 1000)
            list += element.name + '\n';
        else
            list2 += element.name + '\n';
    });
    if (list2 == "") {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("List: ", list)
        return embed;
    } else {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("List: ", list)
            .addBlankField()
            .addField("List continued: ", list2)
        return embed;
    }
}
exports.FuzzySort = (target, json) => {
    const options = {
        limit: 5, // don't return more results than you need!
        allowTypo: true, // if you don't care about allowing typos
        threshold: -10000, // don't return bad results
        key: 'name'
    }
    var results = fuzzysort.go(target, json, options)
    return results;
}
exports.DidYouMeanEmbed = (client, searchmessage) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Did you mean?: ", searchmessage + '\n' + "Reply with your choice");
    return embed;
}
exports.SearchMessage = (results) => {
    var counter = 1;
    var searchmessage = "";
    results.forEach(element => {
        searchmessage += counter + ":" + element.obj.name + '\n';
        counter++;
    })
    return searchmessage;
}
exports.ErrorWrongNumber = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Error", "Not a valid request please try again")
    return embed;
}
exports.ErrorWrong = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Error", "Not a valid request please try again")
    return embed;
}
