const Discord = require("discord.js");
exports.run = (client, message, args) => {
    console.log("Reloadall loaded");
    var commandarray = client.commands.keyArray();
    commandarray.forEach(element => {
        console.log(element.toString());
        var commandName = element.toString();
        if (commandName == "r") return;
        delete require.cache[require.resolve(`./${commandName}.js`)];
        const props = require(`./${commandName}.js`);
        client.commands.set(commandName, props);
    });
    embedMessage();

    function embedMessage() {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("Attention: ", "Reloaded all Modules");

        message.channel.send({ embed }).catch(console.error);
    }
}