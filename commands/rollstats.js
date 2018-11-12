const Utils = require('../modules/diceutils.js');

exports.run = (client, message, args) => {
        var rollTotal = "";
        var rollDefault = "4d6d";
        var toRoll = "";
        if(args[0] == null|| args[0] == null){
            toRoll = rollDefault;
        }
        else{
            toRoll = args[0];
        }
        rollTotal = Utils.MultiRoll(6,toRoll,true,client,message);
        message.reply(rollTotal)
  
}
