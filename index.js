#!/usr/bin/env node

import welcome from "./src/render.js";
import player from "./src/player.js";
import level from "./src/level.js";
import state from "./src/state.js";
import game from "./src/game.js";

console.clear();
await welcome.renderWelcomeMessage();
await player.askPlayerName();
await level.askDifficultLevel();
await state.askPlayerReady();
await game.startToPlay();