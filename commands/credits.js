const Discord = require("discord.js");
exports.run = (client, message, args) => {
    embedMessage();
    function embedMessage() {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("Credits: ", "Lithial")
        message.channel.send({ embed });
    }

}
