Gitter Calc Bot
=====

[![Join the chat at https://gitter.im/A-gambit/UAWC-GITTER-BOT](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/A-gambit/UAWC-GITTER-BOT?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Gitter Calc Bot -  watches the action in the room given at the start and respond to those messages that meet the format "calc ..." The result of evaluating the expression that comes after "calc". Required limited operation (), *, /, +, -.
For example, if one of the users in the room wrote: calc 1 + 2
That boat should answer message:
1 + 2 = 3

### Installation

    $ npm install

### To run tests

Test using Mocha

```bash
$ npm test
```

or

```bash
$ mocha test/test.js
```

### Run script

```bash
$ node bot/index.js <name of room>
```

