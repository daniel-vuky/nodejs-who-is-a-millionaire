import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import cliProgress from "cli-progress"
import sleeper from "./sleeper.js";

let difficultLevel;

async function askDifficultLevel(name) {
    try {
        const askNamePrompt = await inquirer.prompt({
            type: 'list',
            name: 'difficult_level',
            message: 'Chose the difficult level?',
            choices: ['Normal', 'Hard', 'Hell'],
        });
        difficultLevel = askNamePrompt.difficult_level;
        await renderSelectedLevel();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

async function renderSelectedLevel() {
    switch (difficultLevel) {
        case "Normal":
            await renderDifficultNotification(10, "1,000,000");
            break;
        case "Hard":
            await renderDifficultNotification(15, "1,500,000");
            break;
        default:
            await renderDifficultNotification(20, "2,000,000");
            break;
    }
}

async function renderDifficultNotification(totalQuestions, totalPrize) {
    const neonTitle = chalkAnimation.neon(
        `${difficultLevel} level will have ${totalQuestions} questions with total prize value about ${totalPrize}$`
    );
    await sleeper(500);
    neonTitle.stop();

    const bar = new cliProgress.SingleBar(
        {
            format: 'Loading questions [{bar}] {percentage}% | Loaded {value}/{total} questions'
        },
        cliProgress.Presets.shades_classic
    );
    bar.start(totalQuestions, 0);
    for (let progress = 1; progress <= totalQuestions; progress ++) {
        bar.update(progress);
    }
    bar.stop();
}

function getCountOfQuestion() {
    return {
        "Normal": 10,
        "Hard": 15,
        "Hell": 20,
    }[difficultLevel];
}

const result = {
    getCountOfQuestion: getCountOfQuestion,
    askDifficultLevel: askDifficultLevel
}

export default result;