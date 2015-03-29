var Gitter = require('node-gitter');

var token = 'fed5d7b1e952660afb72fc5058b9e544bf1326a6';
var gitter = new Gitter(token);
var url = process.argv[2];


/** @function
 * arguments message
 * return string with mathematical expression
 *        if message start from calc and after
 *        it have only numbers and mathematical
 *        operations as ()+-/*
 *        else return ""
 * @name getEval */

 var getEval = function(msg){
  var isCalc = /^calc/g.test(msg)
    , val = msg.substring(4, msg.length)
    , isValid = /^[0-9+-/*.()]+$/.test(val);

  return isCalc && isValid ? val : ""
};

/** @function
 * arguments url of gitter room
 *  Start working of Bot which calculate
 *  message with calc... and send solution
 * @name GitterBot */

module.exports = GitterBot = function(url){
  gitter.rooms.join(url)
  .then(function(room) {
    var events = room.listen();

    events.on('message', function(message) {
      var msg = message.text.replace(/ /g, "")
        , req = getEval(msg)
        , res = req + "=" + eval(req);

      if(!req.length) return;
      room.send(res);
    });
  });
};

GitterBot(url);