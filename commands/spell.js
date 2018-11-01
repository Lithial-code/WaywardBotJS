const Discord = require("discord.js");
exports.run = (client, message, args) => {
  var fs = require('fs');
  var json = JSON.parse(fs.readFileSync('./json/spells.json', 'utf8'));
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
      if (json[i].name.toLowerCase().includes(targettrim)) {
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
      list += element.name + '\n';
    });
    console.log(list);
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("List: ", list)
    message.channel.send({ embed });
  } 
  
  //Method for making spell embed
  function embedMessage(target) {
    const embed = new Discord.RichEmbed()
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp()
      .addField("Name: ", target.name)
      /*
       * Inline fields may not display as inline if the thumbnail and/or image is too big.
       */
      .addField("Time", target.time, true)
      .addField("Cost", target.cost, true)
      .addField("Range", target.range, true)
      .addField("Duration", target.duration, true)
      .addField("Description", target.text);


    message.channel.send({ embed });
  }
}