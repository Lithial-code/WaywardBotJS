const Discord = require("discord.js");
exports.run = (client, message, args) => {
  var fs = require('fs');
  var json = JSON.parse(fs.readFileSync('./json/actions.json', 'utf8'));
  //
  //Make list of all the secret names
  //
  if (args[0] == '*') {
    embedList();
  }
  //else write the embed for the json object after pooling all the args into one name.
  else {
    var target = "";
    args.forEach(element => {
      target += element + " ";
    });
    var targettrim = target.trim(); //trim the white space off the end so .includes reads it properlyW
    var found = false;
    for (var i = 0; i < json.length; i++) {
      if (json[i].action.toLowerCase().includes(targettrim)) {
        found = true;
        embedMessage(json[i]);
        break;
      }
    }
  }
  //
  //method for making list of names
  //
  function embedList() {
    var list = "";
    json.forEach(element => {
      list += element.action + '\n';
    });

    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("List: ", list)
    message.channel.send({ embed }).catch(console.error);
  }
  //Method for making condition embed
  function embedMessage(target) {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Name: ", target.action)
      .addField("Description", target.text);

    message.channel.send({ embed }).catch(console.error);
  }

}