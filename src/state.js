import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import sleeper from "./sleeper.js";

async function askPlayerReady() {
    try {
        const askPlayerReadyPrompt = await inquirer.prompt({
            type: 'input',
            name: 'player_ready',
            message: 'Are you ready?',
            default() {
                return 'Y';
            },
        });
        const playerReady = (askPlayerReadyPrompt.player_ready).toString().toLowerCase();
        if (playerReady !== 'y') {
            console.log("Comeback when you are ready!");
            process.exit(0);
        }
        await renderStartedMessage();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

async function renderStartedMessage() {
    const rainbowTitle = chalkAnimation.rainbow(
        "Good luck!"
    );
    await sleeper(500);
    rainbowTitle.stop();
}

const result = {
    askPlayerReady: askPlayerReady
}

export default result;