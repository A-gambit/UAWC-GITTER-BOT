var url = 'a-gambit/test';
var index = require('./../index.js')(url, false);

var token = "b837e4508d1b32c66773de8df27ba7828a97e675";

var Gitter = require('node-gitter');
var gitter = new Gitter(token);
var me;

var assert = require("assert");

gitter.currentUser().then(function(user) {
  me = user.username;
});

describe('Gitter-Bot', function() {

  describe('easy test', function () {
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

  describe('normal test', function () {
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

  describe('hard test', function () {
    it('check message: calc (34/2/2/223.1+(121 - 2)/3+12.77777777)', function (done) {
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        room.send('calc (34/2/2/223.1+(121 - 2)/3+12.77777777)');
        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me;
          if(isCurUser) return;
          assert.equal('(34/2/2/223.1+(121-2)/3+12.77777777)=52.482543943614225', message.text);
          done();
        });
      });
      this.timeout(15000);
    });
  });

  describe('validation test 1', function () {
    it('check message: calc 1+1easy+(1+1)', function (done) {
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        var test = true;

        room.send('calc 1+1a');
        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me;
          if(isCurUser) return;
          test = false;
        });

        setTimeout(function(){
          assert.equal(test, true);
          done();
        },4000)
      });
      this.timeout(15000);
    });
  });

  describe('validation test 2', function () {
    it('check message: calc 1+12(1*2)+(1+1)', function (done) {
      gitter.rooms.join(url).then(function(room){
        var events = room.listen();
        var test = true;

        room.send('calc 1+12(1*2)+(1+1)');
        events.on('message', function (message) {
          var isCurUser = message.fromUser.username == me;
          if(isCurUser) return;
          test = false;
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


