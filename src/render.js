import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import sleeper from "./sleeper.js";


async function renderWelcomeMessage() {
    const rainbowTitle = chalkAnimation.rainbow(
        "Are you ready to become a millionaire? \n"
    );
    await sleeper(500);
    rainbowTitle.stop();
}

async function renderWinnerMessage(playerName) {
    console.clear();
    figlet(`Congratulations, ${playerName}. You won $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');
        process.exit(0);
    })
}

const result = {
    renderWelcomeMessage: renderWelcomeMessage,
    renderWinnerMessage: renderWinnerMessage
}

export default result;