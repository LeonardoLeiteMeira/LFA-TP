const { Console } = require("console");

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
    makeTransition() {},
    hasTransitionsToMake(char, transitions, currentState, stack) {
        for (let index = 0; index < transitions.length; index++) {
            if (
                transitions[index].from === currentState &&
                (transitions[index].input === char ||
                    transitions[index].input === "#") &&
                (transitions[index].pop === stack[stack.length - 1] ||
                    transitions[index].pop === "#")
            ) {
                return true;
            }
        }
        return false;
    },
    checkApd(word) {
        const apd = this.getApd();
        const stack = [];
        const transitions = this.getTransitions(apd);

        currentState = apd.initialState;
        let isValid = false;
        let index = 0;

        word = word.replace("#", "");

        while (
            this.hasTransitionsToMake(
                word.charAt(index) ? word.charAt(index) : "",
                transitions,
                currentState,
                stack
            )
        ) {
            let lambda = true;
            [...transitions].forEach((transition) => {
                if (
                    transition.from === currentState &&
                    transition.input === word.charAt(index) &&
                    (transition.pop === stack[stack.length - 1] ||
                        transition.pop === "#")
                ) {
                    currentState = transition.to;

                    const size = transition.push.length;
                    for (let i = size - 1; i >= 0; i--) {
                        transition.push.charAt(i) != "#" &&
                            stack.push(transition.push.charAt(i));
                    }
                    transition.pop !== "#" && stack.pop();
                    index++;
                    lamba = false;
                }
            });
            if (lambda) {
                [...transitions].forEach((transition) => {
                    if (
                        transition.input === "#" &&
                        (transition.pop === stack[stack.length - 1] ||
                            transition.pop === "#")
                    ) {
                        currentState = transition.to;
                        const size = transition.push.length;
                        for (let idx = size - 1; idx >= 0; idx--) {
                            transition.push.charAt(idx) != "#" &&
                                stack.push(transition.push.charAt(idx));
                        }
                        transition.pop !== "#" && stack.pop();
                    }
                });
            }
        }
        if (
            stack.length === 0 &&
            index === word.length &&
            apd.finalStates.includes(currentState)
        ) {
            isValid = true;
        }

        return isValid;
    },

    checkWord(word) {
        let isWordValid = this.checkApd(word);
        if (isWordValid) {
            console.log("Sim");
        } else {
            console.log("Não");
        }
        readInput();
    },
};
