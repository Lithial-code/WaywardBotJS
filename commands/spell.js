const Discord = require("discord.js");  
exports.run = (client, message,args) => {
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('./json/spells.json', 'utf8'));
    var target = args.toString();
    console.log(target)
    var found = false;
    for(var i = 0; i < json.length; i++) {
    if (json[i].name.toLowerCase().includes(target)) {
     found = true;
    embedMessage(json[i]);
     break;
   }
}
function embedMessage(target)
{
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
  .addField("Time",  target.time, true)
  .addField("Cost", target.cost, true)
  .addField("Range",  target.range, true)
  .addField("Duration",  target.duration, true)
  .addField("Text", target.text);
  

  message.channel.send({embed});
    }
}