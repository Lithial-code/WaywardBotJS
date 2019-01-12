const Discord = require('discord.js')
const config = require("../config.json");
exports.run = (client, message, args) => {
    var GM_ROLE = "West Marches GM";
    const GMRole = message.guild.roles.find(role => role.name === GM_ROLE);
    const BOTRole = message.guild.roles.find(role => role.name === "Bot");
    const EVRole = message.guild.roles.find(role => role.name === "@everyone");
    const member = message.member;

    //ID for westmarches catagory
    try {
        var WM_CAT_ID = message.guild.channels.find(x => x.name === 'wm_expeditions').id;
    }
    catch (err) {
        message.reply("Please create a catagory labeled WM_EXPEDITIONS to use this command");
        return;
    }
    if (WM_CAT_ID != null || WM_CAT_ID != "") {
        if (member.roles.has(GMRole.id) && (args[0] != null || args[0] != "")) {
            var targetstring = args[0].trim().toLowerCase(); 
            targetstring = targetstring.replace('\n', "");

            message.guild.createRole(
                {
                    name: targetstring,
                    permissions: ['READ_MESSAGES']
                })
                .then(role => {
                    //log new role creation
                    console.log(`Created new role with name ${role.name}`)
                    //Make it so the role can be pinged
                    role.setMentionable(true, 'Role Created for Channel')
                        .then(updated => console.log(`Role mentionable: ${updated.mentionable}`))
                        .catch(console.error);
                    // Saving userlist to a variable
                    var userlist = message.mentions.users;
                    if (userlist != null) {
                        //Search guildies for user and add the role      
                        userlist.forEach(function (user) {
                            message.guild.member(user).addRole(role);
                        });
                    }
                    //create IC channel and assign override perms
                    message.guild.createChannel(`${role.name}`)
                        .then((channel) => {
                            channel.setParent(WM_CAT_ID);
                            channel.overwritePermissions(EVRole,
                                { 'VIEW_CHANNEL': false })
                                .catch(err => console.log(`channel EVROLE: ${err}`));
                            channel.overwritePermissions(role,
                                {
                                    'READ_MESSAGES': true, 'SEND_MESSAGES': true, 'EMBED_LINKS': true,
                                    'ATTACH_FILES': true, 'READ_MESSAGE_HISTORY': true, 'MENTION_EVERYONE': true
                                })
                                .catch(err => console.log(`channel Role: ${err}`));
                            channel.overwritePermissions(GMRole,
                                {
                                    'MANAGE_CHANNELS': true, 'MANAGE_MESSAGES': true, 'MANAGE_ROLES_OR_PERMISSIONS': true,
                                    'READ_MESSAGES': true, 'SEND_MESSAGES': true, 'EMBED_LINKS': true,
                                    'ATTACH_FILES': true, 'READ_MESSAGE_HISTORY': true, 'MENTION_EVERYONE': true
                                })
                                .catch(err => console.log(`channel GMRole: ${err}`));
                            channel.overwritePermissions(BOTRole,
                                {
                                    'MANAGE_CHANNELS': true, 'MANAGE_MESSAGES': true, 'MANAGE_ROLES_OR_PERMISSIONS': true,
                                    'READ_MESSAGES': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': true
                                })
                                .catch(err => console.log(`channel BOTRole: ${err}`));
                        })
                        .catch(err => console.log(err));
                    //create OOC channel and assign override perms
                    message.guild.createChannel(`${role.name}_ooc`)
                        .then((channel) => {
                            channel.setParent(WM_CAT_ID);
                            channel.overwritePermissions(EVRole,
                                { 'VIEW_CHANNEL': false })
                                .catch(err => console.log(`ooc channel EVROLE: ${err}`));
                            channel.overwritePermissions(role,
                                {
                                    'READ_MESSAGES': true, 'SEND_MESSAGES': true, 'EMBED_LINKS': true,
                                    'ATTACH_FILES': true, 'READ_MESSAGE_HISTORY': true, 'MENTION_EVERYONE': true
                                })
                                .catch(err => console.log(`ooc channel role: ${err}`));
                            channel.overwritePermissions(GMRole,
                                {
                                    'MANAGE_CHANNELS': true, 'MANAGE_MESSAGES': true, 'MANAGE_ROLES_OR_PERMISSIONS': true,
                                    'READ_MESSAGES': true, 'SEND_MESSAGES': true, 'EMBED_LINKS': true,
                                    'ATTACH_FILES': true, 'READ_MESSAGE_HISTORY': true, 'MENTION_EVERYONE': true
                                })
                                .catch(err => console.log(`ooc channel GMROLE: ${err}`));
                            channel.overwritePermissions(BOTRole,
                                {
                                    'MANAGE_CHANNELS': true, 'MANAGE_MESSAGES': true, 'MANAGE_ROLES_OR_PERMISSIONS': true,
                                    'READ_MESSAGES': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': true
                                })
                                .catch(err => console.log(`ooc channel BOTRole: ${err}`));
                        })
                        .catch(err => console.log(err));
                          //create OOC channel and assign override perms
                    message.guild.createChannel(`${role.name}_ooc_tracker`)
                    .then((channel) => {
                        channel.setParent(WM_CAT_ID);
                        channel.overwritePermissions(EVRole,
                            { 'VIEW_CHANNEL': false })
                            .catch(err => console.log(`ooc_tracker channel EVROLE: ${err}`));
                        channel.overwritePermissions(role,
                            {
                                'READ_MESSAGES': true, 'SEND_MESSAGES': true, 'EMBED_LINKS': true,
                                'ATTACH_FILES': true, 'READ_MESSAGE_HISTORY': true, 'MENTION_EVERYONE': true
                            })
                            .catch(err => console.log(`ooc_tracker channel role: ${err}`));
                        channel.overwritePermissions(GMRole,
                            {
                                'MANAGE_CHANNELS': true, 'MANAGE_MESSAGES': true, 'MANAGE_ROLES_OR_PERMISSIONS': true,
                                'READ_MESSAGES': true, 'SEND_MESSAGES': true, 'EMBED_LINKS': true,
                                'ATTACH_FILES': true, 'READ_MESSAGE_HISTORY': true, 'MENTION_EVERYONE': true
                            })
                            .catch(err => console.log(`ooc_tracker channel GMROLE: ${err}`));
                        channel.overwritePermissions(BOTRole,
                            {
                                'MANAGE_CHANNELS': true, 'MANAGE_MESSAGES': true, 'MANAGE_ROLES_OR_PERMISSIONS': true,
                                'READ_MESSAGES': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': true
                            })
                            .catch(err => console.log(`ooc_tracker channel BOTRole: ${err}`));
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
        else {
            console.log("an error has occured.");
        }

    }
}
