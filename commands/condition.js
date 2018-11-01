exports.run = (client, message,args) => {
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('./json/conditions.json', 'utf8'));
    var target = args[0];
    console.log(target)
    var found = false;
    for(var i = 0; i < json.length; i++) {
    if (json[i].name.toLowerCase() == target) {
     found = true;
    embedMessage(json[i]);
     break;
   }
}
    function embedMessage(target)
    {
       return message.channel.send({embed: {
            color: 3447003,
            fields: [{
                name: target.name,
                value: target.text
              },
          
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Lelantos Studios"
            }
          }
        });  
   }
  
}