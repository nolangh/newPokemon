//const apiKey = "ef72570ff371408f9668e414353b7b2e";
const apiKey = import.meta.env.VITE_apiKey;
const apiSets = "https://api.pokemontcg.io/v2/sets";
const cardContainer = document.getElementById("card-cont");
const reset = document.getElementById("reset-btn");
const pos = document.getElementById("selectSet");
let cardSets = [];
let setName;

/* -----------------------------ANCHOR Event Listeners ----------------------------- */

reset.addEventListener("click", () => {
	window.location.reload(true);
});

pos.addEventListener("change", () => {
	setName = pos.value;
	fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setName}`, {
		headers: {
			"X-api-key": apiKey,
		},
	})
		.then((res) => res.json())
		.then((filteredSet) => {
			const allPokemon = filteredSet.data;
			allPokemon.forEach((data) => createCard(data));
		});
});

function getSets() {
	fetch(apiSets, {
		headers: {
			"X-Api-Key": apiKey,
		},
	})
		.then((res) => res.json())
		.then((setInfo) => {
			cardSets = setInfo.data;
			selectSet();
		});
}

function selectSet() {
	const testSelectHtml = cardSets.reduce((html, data) => {
		return html + `<option value="${data.id}">${data.name}</option>`;
	}, "");
	pos.innerHTML = testSelectHtml;
}

function createCard(data) {
	const pokeCardDiv = document.createElement("div");
	pokeCardDiv.classList.add("card");

	const pImage = new Image();
	pImage.classList.add("card-img-top");
	pImage.src = data.images.large;
	pImage.loading = "lazy"; // Add 'loading' attribute for lazy loading
	pokeCardDiv.appendChild(pImage);
	cardContainer.appendChild(pokeCardDiv);
}

function render() {
	getSets();
}

render();
