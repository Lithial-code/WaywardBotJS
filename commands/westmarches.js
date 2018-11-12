const Discord = require('discord.js')
const config = require("../config.json");

exports.run = (client, message, args) => {
    if (message.author.id !== config.ownerID)
        return;
    const role = message.guild.roles.find(role => role.name === "West Marches");
    const member = message.member;
    if(member.roles.has(role.id)) {
        member.removeRole(role);
        message.reply("West Marches Role Removed");
      } else {
        member.addRole(role);
        message.reply("West Marches Role Assigned");
      }
  
}