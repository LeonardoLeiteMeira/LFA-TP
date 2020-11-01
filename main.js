const helpers = require("./helpers.js");

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

readInput = () => {
    // readline.question("", (word) => {
    //     if (word === "asd") return readline.close();
    //     console.log(() => checkApd(word));
    //     readInput();
    // });
    readline.question("", (word) => helpers.checkWord(word));
};

readInput();
