module.exports = {
    getApd() {
        file = JSON.parse(require("fs").readFileSync(process.argv[2])).ap;

        return (apd = {
            states: file[0],
            alphabet: file[1],
            stackAlphabet: file[2],
            transitions: file[3],
            initialState: file[4],
            finalStates: file[5],
        });
    },
    getTransitions(apd) {
        let transitions = [];
        for (i = 0; i < apd.transitions.length; i++) {
            transitions.push({});
            transitions[i] = {
                from: apd.transitions[i][0],
                input: apd.transitions[i][1],
                pop: apd.transitions[i][2],
                to: apd.transitions[i][3],
                push: apd.transitions[i][4],
            };
        }
        return transitions;
    },

    checkApd(word) {
        const apd = this.getApd();
        const stack = [];
        const transitions = this.getTransitions(apd);

        currentState = apd.initialState;

        for (i = 0; i < word.length; i++) {
            console.log(word[i]);

            /* magica */
        }
    },

    checkWord(word) {
        if (word === "asd") return readline.close();
        this.checkApd(word);
        readInput();
    },
};
