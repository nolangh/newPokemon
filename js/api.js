//NOTE this Branch is for making the name/url object array && randomizer function
const apiCards = "https://api.pokemontcg.io/v2/cards?page=1&pageSize=32";
const apiSets = "https://api.pokemontcg.io/v2/sets";
const apiKey = "ef72570ff371408f9668e414353b7b2e";
const pokeCards = []; //this is the array that has each pokemon
let cardSets = [];

//ANCHOR creates pokemon object
function Pokemon(image, name) {
	this.url = image;
	this.name = name;
}

//ANCHOR this function grabs the cards
function getCards() {
	return fetch(apiCards, {
		method: "GET",
		headers: {
			"X-Api-Key": apiKey,
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((pokemon) => {
			let cards = pokemon;
			cards.data.forEach((data) => {
				let newPokemon = new Pokemon(data.images.small, data.name);
				pokeCards.push(newPokemon);
			});
		});
}

console.log(pokeCards);

//ANCHOR this function grabs the sets ignore anything below this line, this is for page 3
function getSets() {
	return fetch(apiSets, {
		method: "GET",
		headers: {
			"X-Api-Key": apiKey,
		},
	})
		.then((res) => {
			return res.json();
		})
		.then((setInfo) => {
			cardSets = setInfo;
		})
		.then(() => {
			selectSet();
		});
}

function selectSet() {
	let testSelectHtml = "";
	cardSets.data.forEach((data) => {
		testSelectHtml += `<option value="${data.id}">${data.name}</option>`;
	});
	document.getElementById("selectSet").innerHTML = testSelectHtml;
	// $("#selectSet").text(testSelectHtml);
}

/* ----------------------- ANCHOR Randomizer function -----------------------
function random(arr) {
	// const randomIndex = Math.floor(Math.random() * arr.length);
	// const item = arr[randomIndex];
	// return item;
}

const result = random(pokeCards); */

/* ------------------NOTE This is just a render function ----------------- */
function render() {
	getSets();
	getCards();
	//random();
}

render();
