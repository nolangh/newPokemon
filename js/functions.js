let screenMode;
let game = {
	status: "setup",
	players: 2,
	player: 1,
	dimensions: [],
	fMatch: [""],
	sMatch: [""],
	scores: [],
	cards: [
		{
			name: "pikachu",
			index: 0,
			url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
			active: true,
			visible: false,
		},
		{
			name: "pikachu",
			index: 0,
			url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
			active: true,
			visible: false,
		},
	],
};

function startMenu() {
	$("main").empty();
	$("main").append(
		`<button type="button" name="button" onclick="setBoard(4,3)">Start Game</button>`
	);
	screenMode = "start menu";
}
function setBoard(x, y, players) {
	score = 0;
	game.dimensions = [x, y];
	game.players = players;
	pokemonList = pokeCards;
	game.status = "play";

	for (let i = 0; i < players; i++) {
		game.scores[i] = 0;
	}

	let myCards = [[]];
	for (let i = 0; i < (x * y) / 2; i++) {
		let currPokemon = Math.floor(Math.random() * pokemonList.length);
		for (let j = 0; j < 2; j++) {
			myCards.splice(Math.floor(Math.random() * myCards.length), 0, {
				name: pokemonList[currPokemon].name,
				index: currPokemon,
				url: pokemonList[currPokemon].url,
				active: true,
				visible: true,
			});
		}
	}
	game.cards = myCards;
	printCards(game.cards);

	setTimeout(flipAll, 2500);
	setTimeout(setToPlay, 2500);
}

function flipCard(index) {
	if (game.cards[index].visible) {
		game.cards[index].visible = false;
	} else {
		game.cards[index].visible = true;
	}
	update();
}
function flipMatches() {
	game.status = "pause";
	// purr(`flipping cards ${game.fMatch[1]} and ${game.sMatch[1]}`)
	flipCard(game.fMatch[1]);
	flipCard(game.sMatch[1]);
	game.fMatch = [""];
	game.sMatch = [""];
	setToPlay();
}
function removeMatches() {
	game.status = "pause";
	// purr(`removing cards ${game.fMatch[1]} and ${game.sMatch[1]}`)
	removeCard(game.fMatch[1]);
	removeCard(game.sMatch[1]);
	game.fMatch = [""];
	game.sMatch = [""];
	setToPlay();
}
function seeIfMatch(index) {
	if (game.fMatch[0] == "") {
		game.fMatch[0] = game.cards[index].name;
		game.fMatch[1] = index;
	} else if (game.sMatch == "") {
		game.sMatch[0] = game.cards[index].name;
		game.sMatch[1] = index;
		if (game.fMatch[0] == game.sMatch[0]) {
			game.status = "pause";
			setTimeout(removeMatches, 500);
			nextTurn(1);
		} else {
			game.status = "pause";
			setTimeout(flipMatches, 500);
			nextTurn(0);
		}
	} else {
		purr(`match error`);
	}
}
function haveMatch() {
	if (game.fMatch[0] === game.sMatch[0]) {
		return true;
	} else {
		return false;
	}
}

function nextTurn(score) {
	game.scores[game.player - 1] += score;
	if (game.player != game.players) {
		game.player++;
	} else {
		game.player = 1;
	}
}
function removeCard(index) {
	game.cards[index].active = false;
	update();
}
function flipAll() {
	for (let i = 0; i < game.dimensions[0] * game.dimensions[1]; i++) {
		flipCard(i);
	}
	game.fMatch = [""];
	game.sMatch = [""];
}
function setToPlay() {
	game.status = "play";
}
function update() {
	printCards(game.cards);
}
