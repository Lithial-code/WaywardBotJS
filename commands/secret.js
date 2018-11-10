const Utils = require('../modules/utils.js');

exports.run = (client, message, args) => {  
  Utils.Generate(client,message,args,"secrets");
 }
 
