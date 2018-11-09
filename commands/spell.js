const Discord = require("discord.js");
const Utils = require('../modules/utils.js');


exports.run = (client, message, args) => {
  var fs = require('fs');
  const json = JSON.parse(fs.readFileSync('./json/spells.json', 'utf8'));

  var target = Utils.FindTarget(args);


  if (args[0] == '*') {
    message.reply(Utils.EmbedList(client, json));
  }
  else {
    let results = Utils.FuzzySort(target, json);
    if (results.length <= 0)
      message.reply(Utils.ErrorWrong(client));

    else if (results[0].obj.name.toLowerCase() == target)
      message.reply(EmbedMessage(client, results[0].obj)).catch(err => console.log(err));
    else {
      message.reply(Utils.DidYouMeanEmbed(client, Utils.SearchMessage(results)))
        .then(() => {
          message.channel.awaitMessages(Utils.filter, { maxMatches: 1, time: 30000, errors: ['time'] })
            .then(collected => {
              if (collected.first() == "c") {
                message.reply(Utils.SelectionCancelled(client));
              }
              else {
                message.reply(EmbedMessage(client, results[parseInt(collected.first()) - 1].obj)).catch(err => console.log(err));
              }
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
  if (target.type == "spell") {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Name: ", target.name)
      .addField("Time", target.time, true)
      .addField("Cost", target.cost, true)
      .addField("Range", target.range, true)
      .addField("Duration", target.duration, true)
      .addField("Description", target.text);
    return embed;
  }
  else if (target.type == "ceremony") {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Name: ", target.name)
      .addField("Secret", target.secret)
      .addField("Description", target.text)
      .setImage(target.img);
    return embed;
  }
  else if (target.type == "ritual") {

    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Name", target.name, true)
      .addField("Casting Time: ", target.castingtime, true)
      .addBlankField(true)
      .addField("Description", target.text, false);
    return embed;
  }
}
