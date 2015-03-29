var Gitter = require('node-gitter');

var token = 'fed5d7b1e952660afb72fc5058b9e544bf1326a6';
var gitter = new Gitter(token);
var url = process.argv[2];

var getEval = function(msg){
  var isCalc = /^calc/g.test(msg)
    , val = msg.substring(4, msg.length)
    , isValid = /^[0-9+-/*.()]+$/.test(val);

  return isCalc && isValid ? val : ""
};

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