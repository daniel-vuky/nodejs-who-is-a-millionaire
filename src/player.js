import inquirer from "inquirer";

let playerName;

async function askPlayerName() {
    try {
        const askNamePrompt = await inquirer.prompt({
            name: 'player_name',
            type: 'input',
            message: 'What is your full name?',
            default() {
                return 'Player';
            },
        });

        playerName = askNamePrompt.player_name;
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

function getPlayerName() {
    return playerName;
}

const result = {
    getPlayerName: getPlayerName,
    askPlayerName: askPlayerName
}

export default result;