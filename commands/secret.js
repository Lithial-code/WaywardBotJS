const Discord = require("discord.js");  
exports.run = (client, message,args) => {
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('./json/secrets.json', 'utf8'));
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
  .addField("Text", target.text)
  .addField("Invocation", target.invocation)
  .addField("Ritual", target.ritual)
  .addField("First Mastery",  target.firstmastery, true)
  .addField("Second Mastery", target.secondmastery, true)
  .addField("Third Mastery",  target.thirdmastery, true)
  .addField("Final Mastery",  target.finalmastery, true);
 
  message.channel.send({embed});
    }
}