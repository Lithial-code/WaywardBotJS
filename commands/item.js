const Discord = require("discord.js");  
exports.run = (client, message,args) => {
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('./json/items.json', 'utf8'));
    var target = args.toString();
    console.log(target)
    var found = false;
    for(var i = 0; i < json.length; i++) {
        if (json[i].name.toLowerCase().includes(target)) {
     found = true;
     if(json[i].itemtype=="Weapon")
     {
        embedWeaponMessage(json[i]);
     }else
     if(json[i].itemtype=="Armor")
     {
        embedArmorMessage(json[i]);
     }
     break;
   }
}
    function embedWeaponMessage(target)
    {
        const embed = new Discord.RichEmbed()
       /*
        * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor(0x00AE86)
        /*
        * Takes a Date object, defaults to current date.
        */
       .setFooter("© Lelantos Studios", client.user.avatarURL)
        .setTimestamp()
        /*
        * Inline fields may not display as inline if the thumbnail and/or image is too big.
        */
        .addField("Name", target.name)
        .addField("Damage", target.damage, true)
        .addField("Type", target.type, true)
        .addField("Reach/Range", target.range, true)
        .addField("Cost", target.cost, true)
        .addField("Properties", target.properties, true)
        .addField("Special", target.special);
        
        message.channel.send({embed}); 
   }
   function embedArmorMessage(target)
   {
       const embed = new Discord.RichEmbed()
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
       .setColor(0x00AE86)
       /*
       * Takes a Date object, defaults to current date.
       */
      .setFooter("© Lelantos Studios", client.user.avatarURL)
       .setTimestamp()
       /*
       * Inline fields may not display as inline if the thumbnail and/or image is too big.
       */
       .addField("Name", target.name)
       .addField("Base AC", target.baseac, true)
       .addField("Dex Pen", target.dexpen, true)
       .addField("DR", target.dr, true)
       .addField("Type", target.type, true)
       .addField("Max Dex", target.maxdex, true)
       .addField("Cost", target.cost);
       
       message.channel.send({embed}); 
  }
}