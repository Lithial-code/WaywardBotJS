const Discord = require("discord.js");
const fuzzysort = require('fuzzysort');
//filter for fuzzy search to check if response is either not a number or a c for cancel
const filter = response => {
    var check = !isNaN(parseInt(response.content));
    if (check) {
        return check;
    }
    else if (response.content == "c") {
        return response.content == "c";
    }
};
//returns capitalised versions of string
Ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
//creates combined args string 
FindTarget = (args) => {
    var target = "";
    args.forEach(element => {
        target += element + " ";
    });
    target = target.toLowerCase().trim();
    return target;
};
//used for embed list of * commands
EmbedList = (client, json) => {
    var list = "";
    var list2 = "";
    var list3 = "";
    json.forEach(element => {
        if (list.length < 1000) {
            console.log(element.name)
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

    });

    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp();

    if (list2 == "" && list3 == "") {
        embed.addField("List: ", list);
        return embed;
    }
    else if (list3 == "" && list2 != "") {
        embed.addField("List: ", list)
             .addField("List continued: ", list2);
        return embed;
    }
    else {
        embed
            .addField("List: ", list)
            .addField("List continued: ", list2)
            .addField("List continued: ", list3);
        return embed;
    }
};
//fuzzy sort. finds target obj in inputed json
FuzzySort = (target, json) => {
    const options = {
        limit: 5, // don't return more results than you need!
        allowTypo: true, // if you don't care about allowing typos
        threshold: -1000, // have no idea what this does
        keys: ['name', 'altname']
    }
    var results = fuzzysort.go(target, json, options);
    return results;
};
//embed message with list of choices close to target
DidYouMeanEmbed = (client, searchmessage) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Did you mean?: ", searchmessage + '\n' + "Reply with your choice");
    return embed;
};
//apart of Didyoumeanembed. Provides the list of choices
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
//reply embed for error wrong number
ErrorWrongNumber = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Error", "Not a valid request please try again")
    return embed;
};
//reply embed for error not a valid request
ErrorWrong = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Error", "Not a valid request please try again")
    return embed;
};
//reply embed for selection cancelled
SelectionCancelled = (client) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        .addField("Cancelled", "Your selection has been cancelled")
    return embed;
};
//reply embed for main obj
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
        //TODO split value into two if over 1000 length
        var inline = value.length < 5;
        if (key == "type")
            continue;
        if (value == "")
            continue;
        if (key == "altname")
            continue;
        if (key == "img")
            embed.setImage(value);
        else {
            embed.addField(Ucfirst(key), value.slice(0, 1023), inline);
            if (value.length >= 1024)
                embed.addField('...', value.slice(1023), inline);
        }
    }
    return embed;
};
//the logic behind everything. this is the method called to make things happen
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
        if (results.length == 1) {
            message.reply(EmbedMessage(client, results[0].obj, name)).catch(err => console.log(err));
        }
        //surroud with check for null result
        if (results != null && results[0] != null && results.length > 1) {
            if (results[0].obj.name.toLowerCase() == target) {
                try {
                    message.reply(EmbedMessage(client, results[0].obj, name))
                }
                catch (err) {
                    console.log("Result[0] doesnt exist")
                }
            }
            else {
                message.reply(DidYouMeanEmbed(client, SearchMessage(results)));
                await ClickCollector(client, message, results, name);

            }
        }
    }
};
//this one summons the collector to take user response
async function ClickCollector(client, message, results, name) {
    message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
        .then(collected => {
            //console.log(`Collected this message: ${collected.first()}`)
            //console.log(!isNaN(parseInt(collected.first())));
            if (collected.first() == "c") {
                message.reply(SelectionCancelled(client));
            }
            else if (!isNaN(parseInt(collected.first()))) {
                var id = parseInt(collected.first()) - 1;

                //console.log(`I should be sending the results now. The number is ${id}`)
                //console.log(`results are  ${results[id].obj.name}`)

                message.reply(EmbedMessage(client, results[id].obj, name)).catch(err => console.log(err));
            }
            else {
                console.log("ERROR ERROR !!!")
            }
        })
        .catch(collected => {
            message.reply(ErrorWrongNumber(client));
            console.log(collected);
        })
};

