const Discord = require("discord.js");
const config = require("../config.json");
exports.run = (client, message, args) => {
    if(message.author.id !== config.ownerID) return;
    
    reloadAll();
    embedMessage();


function reloadAll()
{
    console.log("Reloadall loaded");
    var commandarray = client.commands.keyArray();
    commandarray.forEach(element => {
       // console.log(element.toString());
        var commandName = element.toString();
        if (commandName == "r") return;
        delete require.cache[require.resolve(`./${commandName}.js`)];
        const props = require(`./${commandName}.js`);
        client.commands.set(commandName, props);
    });
}
    function embedMessage() {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("Attention: ", "Reloaded all Modules");

        message.channel.send({ embed }).catch(console.error);
    }
}