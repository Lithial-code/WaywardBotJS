const Discord = require("discord.js");
const fuzzysort = require('fuzzysort');

exports.EmbedList = (client, json) => {
    var list = "";
    json.forEach(element => {
        list += element.name + '\n';
    });

    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("List: ", list)
    return embed;
}
exports.FuzzySort = (target, json) => {
    var results = fuzzysort.go(target, json, {
        threshold: -Infinity, // Don't return matches worse than this (higher is faster)
        limit: Infinity, // Don't return more results than this (lower is faster)
        allowTypo: true, // Allwos a snigle transpoes (false is faster)
        key: 'name', // For when targets are objects (see its example usage)
        keys: null, // For when targets are objects (see its example usage)
        scoreFn: null, // For use with `keys` (see its example usage)
    });
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
exports.ErrorWrong = (client) =>{
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Error", "Not a valid request please try again")
    return embed;
  }