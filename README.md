Gitter Calc Bot
=====

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

