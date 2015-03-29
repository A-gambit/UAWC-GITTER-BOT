var url = 'a-gambit/test';
var index = require('./../bot/index.js')(url);

var token = "b837e4508d1b32c66773de8df27ba7828a97e675";

var Gitter = require('node-gitter');
var gitter = new Gitter(token);
var me;

var assert = require("assert");

gitter.currentUser().then(function(user) {
  me = user.username;
});

describe('Gitter-Bot', function() {

  describe('validation test 1', function () {
    it('check message: hi bot', function (done) {
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        var test = true;

        room.send('hi bot');
        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me
            , isRes = /^[hi bot]/.test(message.text);
          if(isCurUser) return;
          if(isRes) test = false;
        });

        setTimeout(function(){
          assert.equal(test, true);
          done();
        },4000)
      });
      this.timeout(15000);
    });
  });

  describe('calc test 1', function () {
    it('check message: calc 1+1', function (done) {
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        room.send('calc 1+1');
        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me;
          if(isCurUser) return;
          assert.equal('1+1=2', message.text);
          done();
        });
      });
      this.timeout(15000);
    });
  });

  describe('calc test 2', function () {
    it('check message: calc (20+16+(4-5)+5+7+(8-7))*(123-16)', function (done) {
      var res = '(34/2/2/223.1+(121-2)/3+12.77777777)=' + (34/2/2/223.1+(121-2)/3+12.77777777);
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        room.send('calc (20+16+(4-5)+5+7+(8-7))*(123-16)');
        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me;
          if(isCurUser) return;
          assert.equal('(20+16+(4-5)+5+7+(8-7))*(123-16)=5136', message.text);
          done();
        });
      });
      this.timeout(15000);
    });
  });

  describe('calc test 3', function () {
    it('check message: calc 2*(10+5+(3-1))', function (done) {
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        room.send('calc 2*(10+5+(3-1))');
        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me;
          if(isCurUser) return;
          assert.equal('2*(10+5+(3-1))=34', message.text);
          done();
        });
      });
      this.timeout(15000);
    });
  });

  describe('calc test 4', function () {
    it('check message: calc (34/2/2/223.1+(121 - 2)/3+12.77777777)', function (done) {
      var res = '(34/2/2/223.1+(121-2)/3+12.77777777)=' + (34/2/2/223.1+(121-2)/3+12.77777777);
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        room.send('calc (34/2/2/223.1+(121 - 2)/3+12.77777777)');
        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me;
          if(isCurUser) return;
          assert.equal(res, message.text);
          done();
        });
      });
      this.timeout(15000);
    });
  });

  describe('validation test 2', function () {
    it('check message: calc 1+1easy+(1+1)', function (done) {
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        var test = true;

        room.send('calc 1+1a');
        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me
            , isRes = /^[1+1a]/.test(message.text);
          if(isCurUser) return;
          if(isRes) test = false;
        });

        setTimeout(function(){
          assert.equal(test, true);
          done();
        },4000)
      });
      this.timeout(15000);
    });
  });

  describe('validation test 3', function () {
    it('check message: calc 1+12(1*2)+(1+1)', function (done) {
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        var test = true;

        room.send('calc 1+12(1*2)+(1+1)');
        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me
            , isRes = /^[1+12(1*2)+(1+1)]/.test(message.text);
          if(isCurUser) return;
          if(isRes) test = false;
        });

        setTimeout(function(){
          assert.equal(test, true);
          done();
        },4000)
      });
      this.timeout(15000);
    });
  });

  describe('validation test 4', function () {
    it('check message: calc sin(4)', function (done) {
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        var test = true;

        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me
            , isRes = /^[sin(4)]/.test(message.text);
          if(isCurUser) return;
          if(isRes) test = false;
        });
        setTimeout(function(){
          assert.equal(test, true);
          done();
        },4000)
      });
      this.timeout(15000);
    });
  });

});


