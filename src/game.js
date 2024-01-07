import player from "./player.js";
import level from "./level.js";
import axios from "axios"
import 'dotenv/config'
import inquirer from "inquirer";
import { createSpinner } from 'nanospinner';
import sleeper from "./sleeper.js";
import render from "./render.js";

const playerName = player.getPlayerName();

async function startToPlay() {
    let countOfQuestion = level.getCountOfQuestion(),
        countOfQuestionAnswered = 0;

    if (!countOfQuestion) {
        countOfQuestion = 10;
    }
    do {
        const question = await getQuestion(getUri(), getApiKey());
        const askNamePrompt = await inquirer.prompt({
            name: 'user_answer',
            type: 'input',
            message: question["data"][0]["question"] + " \n"
        });
        await handleAnswer(question, askNamePrompt);
        countOfQuestionAnswered++;
    } while (
        countOfQuestionAnswered < countOfQuestion
    );
    await render.renderWinnerMessage(playerName);
}

async function handleAnswer(question, askNamePrompt) {
    const isCorrect = question["data"][0]["answer"] === askNamePrompt["user_answer"];
    const spinner = createSpinner('Checking answer...').start();
    await sleeper(500);
    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
        process.exit(1);
    }
}

async function getQuestion(uri, key) {
    try {
        return await axios.get(
            uri,
            {
                headers: {
                    "X-Api-Key": key
                }
            }
        );
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

function getUri() {
    let uri = new URL(process.env["NINJA_APIS_URI"]);
    return `${uri}?category=${getRandomCategory()}`;
}

function getApiKey() {
    return process.env["NINJA_APIS_KEY"];
}

function getRandomCategory() {
    const listCategory = getListCategory();
    return listCategory[Math.floor(Math.random() * 13)]
}

function getListCategory() {
    return [
        "artliterature",
        "language",
        "sciencenature",
        "general",
        "fooddrink",
        "peopleplaces",
        "geography",
        "historyholidays",
        "entertainment",
        "toysgames",
        "music",
        "mathematics",
        "religionmythology",
        "sportsleisure"
    ];
}

const result = {
    startToPlay: startToPlay
}

export default result;