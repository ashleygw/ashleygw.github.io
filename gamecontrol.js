// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S18
function resetGame() {
  tick = 0;
  // Resetting best player score to 0
  if (bestPlayer) {
    bestPlayer.score = 0;
  }
  oArray = [];
  pipesSpawned = 0;
  // pArray = [];
}
  
// Create the next generation
function nextGeneration() {
  resetGame();
  // Normalize the fitness values 0-1
  normalizeFitness(pArray);
  // Generate a new set of players
  paArray = generate(pArray);
  // Copy those players to another array
  pArray = paArray.slice();
}

// Generate a new population of players
function generate(oldPlayers) {
  let newPlayers = [];
  for (let i = 0; i < oldPlayers.length; i++) {
    let player = poolSelection(oldPlayers);
    newPlayers[i] = player;
  }
  return newPlayers;
}

// Normalize the fitness of all players
function normalizeFitness(players) {
  for (let i = 0; i < players.length; i++) {
    players[i].score = pow(players[i].score, 2);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < players.length; i++) {
    sum += players[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < players.length; i++) {
    players[i].fitness = players[i].score / sum;
  }
}

function mutate(x) {
    if (random(1) < 0.1) {
      let offset = randomGaussian() * 0.5;
      let newx = x + offset;
      return newx;
    } else {
      return x;
    }
}

function poolSelection(players) {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= players[index].fitness;
    index += 1;
  }
  index -= 1;
  return players[index].copy();
}