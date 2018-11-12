const Discord = require('discord.js')
const config = require("../config.json");
exports.run = (client, message, args) => {
    var GM_ROLE = "West Marches GM";
    var role2 = "Westmarches";
    const role = message.guild.roles.find(role => role.name === GM_ROLE);
    const member = message.member;
    let chan = undefined;
    let r = undefined;
    let createdRole = args[0].toString();

    if (member.roles.has(role.id)) {
        message.guild.createRole(
            {
                name: args[0],
                permissions: ['READ_MESSAGES']
            })
            .then(() => {
                var role = message.guild.roles.find(role => role.name === createdRole);
                console.log(role);
                chan = message.guild.createChannel(`${createdRole}`)
                    .then((channel) => channel.setParent("510992175224586260"));
                return chan;
            })
            .then((chan) => {
                chan.overwritePermissions(message.guild.roles.find(role => role.name === '@everyone'),
                    { 'VIEW_CHANNEL': false });
                chan.overwritePermissions(message.guild.roles.find(role => role.name === createdRole),
                    {
                        'READ_MESSAGES': true,
                        'SEND_MESSAGES': true,
                        'EMBED_LINKS': true,
                        'ATTACH_FILES': true,
                        'READ_MESSAGE_HISTORY': true
                    });

                chan.overwritePermissions(message.guild.roles.find(role => role.name === GM_ROLE),
                    {
                        'MANAGE_CHANNELS': true,
                        'MANAGE_MESSAGES': true,
                        'MANAGE_ROLES_OR_PERMISSIONS': true,
                        'READ_MESSAGES': true,
                        'SEND_MESSAGES': true,
                        'EMBED_LINKS': true,
                        'ATTACH_FILES': true,
                        'READ_MESSAGE_HISTORY': true
                    });
                chan.overwritePermissions(message.guild.roles.find(role => role.name === "Bot"),
                    {
                        'MANAGE_CHANNELS': true,
                        'MANAGE_MESSAGES': true,
                        'MANAGE_ROLES_OR_PERMISSIONS': true,
                        'READ_MESSAGES': true,
                        'SEND_MESSAGES': true,
                    });
            })

            .then(() => {
                var role = message.guild.roles.find(role => role.name === createdRole);
                console.log(role);
                chan2 = message.guild.createChannel(`${createdRole}_ooc`)
                    .then((channel) => channel.setParent("510992175224586260"));
                return chan2;
            })
            .then((chan2) => {

                chan2.overwritePermissions(message.guild.roles.find(role => role.name === '@everyone'),
                    { 'VIEW_CHANNEL': false }); // Give the channel some standard permissions.

                chan2.overwritePermissions(message.guild.roles.find(role => role.name === createdRole),
                    {
                        'READ_MESSAGES': true,
                        'SEND_MESSAGES': true,
                        'EMBED_LINKS': true,
                        'ATTACH_FILES': true,
                        'READ_MESSAGE_HISTORY': true
                    });

                chan2.overwritePermissions(message.guild.roles.find(role => role.name === GM_ROLE),
                    {
                        'MANAGE_CHANNELS': true,
                        'MANAGE_MESSAGES': true,
                        'MANAGE_ROLES_OR_PERMISSIONS': true,
                        'READ_MESSAGES': true,
                        'SEND_MESSAGES': true,
                        'EMBED_LINKS': true,
                        'ATTACH_FILES': true,
                        'READ_MESSAGE_HISTORY': true
                    });
                chan2.overwritePermissions(message.guild.roles.find(role => role.name === "Bot"),
                    {
                        'MANAGE_CHANNELS': true,
                        'MANAGE_MESSAGES': true,
                        'MANAGE_ROLES_OR_PERMISSIONS': true,
                        'READ_MESSAGES': true,
                        'SEND_MESSAGES': true,
                    });
            })
            .then(() => {
                var userlist = message.mentions.users; // Saving userlist to a variable
                userlist.forEach(function (user) {
                   user.addRole(createdRole); // This should log every mentioned user
                });
            })
            .catch(err => console.log(err));

    }

}



