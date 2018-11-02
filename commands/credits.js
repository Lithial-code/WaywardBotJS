const Discord = require("discord.js");
exports.run = (client, message, args) => {
    embedMessage();
    function embedMessage() {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setFooter("© Lelantos Studios", client.user.avatarURL)
            .setTimestamp()
            .addField("Wayward Adventurers brought to you by: ", "Lelantos Studios")             
            .addField("Game Designer: ", "KawaiiSpider")
            .addField("Bot and data sets brought to you by: ", "Lithial - Lead Programmer");
        message.channel.send({ embed });
    }

}
