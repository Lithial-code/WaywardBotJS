const Discord = require("discord.js");
const config = require("../config.json");
exports.run = (client, message,args) => {
  var listOfCommands = "";
  GenerateHelp();
  message.reply(EmbedMessage());

function GenerateHelp()
{
  var commandarray = client.commands.keyArray();
  listOfCommands = "";
  var counter = 0;
  commandarray.forEach(element => {
 
     var commandName = element.toString();
     if (commandName == "r"||commandName == "reload"||commandName == "reloadall"
     ||commandName == "ping"||commandName == "racealt") return;

     listOfCommands += commandName;
     listOfCommands += ", ";
     
    });
    listOfCommands = listOfCommands.slice(0,listOfCommands.length-2);
    console.log(listOfCommands);
}

    //Method for making condition embed
 function EmbedMessage(target) {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter("© Lelantos Studios", client.user.avatarURL)
      .setTimestamp()
      .addField("Available Commands: ", listOfCommands)
      .addField("Other commands", "You can also use the * argument on any search command to bring up a list of all possible search options")
      .addField("Prefix", config.prefix);

    return embed;
  }
}



