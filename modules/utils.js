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
exports.filter = response => {
    var check = !isNaN(parseInt(response.content));
    if (check) {
        return check;
    }
    else if (response.content == "c") {
        return response.content == "c";
    }
};
exports.EmbedList = (client, json) => {
    var list = "";
    var list2 = "";
    var list3 = "";
    var list4 = "";
    var list5 = "";
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
        else if (list3.length < 1000 && list2.length > 1000) {
            if (element.type != "")
                list3 += `${element.name} (${element.type}) \n`;
            else list3 += `${element.name} \n`;
        }
        else if (list4.length < 1000 && list3.length > 1000) {
            if (element.type != "")
                list4 += `${element.name} (${element.type}) \n`;
            else list4 += `${element.name} \n`;
        }
        else if (list5.length < 1000 && list4.length > 1000) {
            if (element.type != "")
                list5 += `${element.name} (${element.type}) \n`;
            else list5 += `${element.name} \n`;
        }
        else{
            
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
    else if (list3 == "") {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("List: ", list)
            .addField("List continued: ", list2);
        return embed;
    }
    else if (list4 == "") {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("List: ", list)
            .addField("List continued: ", list2)
            .addField("List continued: ", list3);
        return embed;
    }
    else if (list5 == "") {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("List: ", list)
            .addField("List continued: ", list2)
            .addField("List continued: ", list3)
            .addField("List continued: ", list4);
        return embed;
    }
    else {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("List: ", list)
            .addField("List continued: ", list2)
            .addField("List continued: ", list3)
            .addField("List continued: ", list4)
            .addField("List continued: ", list5);
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
    searchmessage += "You can also reply 'c' to cancel \n";
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
exports.SelectionCancelled = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Cancelled", "Your selection has been cancelled")
    return embed;
}
