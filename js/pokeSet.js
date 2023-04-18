const apiKey = "ef72570ff371408f9668e414353b7b2e";
const apiSets = "https://api.pokemontcg.io/v2/sets";
const card = document.querySelector("card");
const cardContainer = document.getElementById("card-cont");
const reset = document.getElementById("reset-btn");
const pos = document.getElementById("selectSet");
const pokeCards = []; //this is the array that has each pokemon
let cardSets = [];
let allPokemon = [];
let goodLord = [];
let setName;

/* -----------------------------ANCHOR Event Listners ----------------------------- */
reset.addEventListener("click", () => {
	window.location.reload(true);
});

pos.addEventListener("change", () => {
	setName = pos.options[pos.selectedIndex].value;
	return fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setName}`, {
		method: "GET",
		headers: {
			"X-api-key": apiKey,
		},
	})
		.then((res) => {
			return res.json();
		})
		.then((filteredSet) => {
			allPokemon = filteredSet;
			console.log(allPokemon);
		})
		.then(() => {
			allPokemon.data.forEach((data) => {
				createCard(data);
			});
		});
});

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
}

function createCard(data) {
	const pokeCardDiv = document.createElement("div");
	pokeCardDiv.classList.add("card");

	const pImage = document.createElement("img");
	pImage.classList.add("card-img-top");
	pImage.src = data.images.large;
	pokeCardDiv.appendChild(pImage);
	cardContainer.appendChild(pokeCardDiv);
}

function render() {
	getSets();
}

render();
