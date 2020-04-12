const ul = document.getElementById('pokemons');
const url = 'https://pokeapi.co/api/v2/';
var num = 0;

// function createPok(num){
// 	fetch(url+'pokemon?offset='+num+'&limit=12')
// 	.then((resp) => resp.json())
// 	.then(function(data) {	
// 		console.log(data)
// 		let pokemonsDetails = data.results.map(function(pokem){
// 	    return fetch(pokem.url).then((res) => res.json());
// 	  })
// 	  return Promise.all(pokemonsDetails)
    
// 	})
// 	.then(data => {
// 	  const containerPoks = document.querySelector('.poks');	  
    
// 	  data.forEach(item => {
// 	  	const container = document.createElement('div');
// 	  	container.classList.add('pokemonCard')
// 	  	const img = document.createElement('img');
// 	  	img.src = item.sprites.front_default;
// 	  	container.append(img);
// 	  	const elements = document.createElement('div');
// 		  elements.innerHTML = `
// 				<h3>${item.name}</h3>
// 				<h4>${item.types[0].type.name}</h4>			
// 		  `
// 		  container.append(elements)
// 		  containerPoks.append(container)
// 	  });
// 	});
// };

// createPok();

function pokemonList() {
  fetch(url+'pokemon?offset='+num+'&limit=12')
  .then(response => response.json())
  .then(function(allPokemon) {
    allPokemon.results.forEach(function(pokemon) {
      getPokemon(pokemon)
    })
  })
};
pokemonList()

function getPokemon(pokemon) {
  let url = pokemon.url;
  
  fetch(url)
  .then(response => response.json())
  .then(function(pokData) {
    renderPokemon(pokData)
  })
};

function renderPokemon(pokData) {
  let mainContainer = document.querySelector('#poks')
  let pokContainer = document.createElement('div')
  pokContainer.classList.add('pokContainer' )
  pokContainer.setAttribute('id',pokData.id )
  pokContainer.setAttribute('data',pokData.types[0]["type"]["name"])
  pokContainer.addEventListener('click', infoPokem )
  let name = document.createElement('h4')
  name.classList.add('name')
  name.innerHTML = pokData.name;
  let id = document.createElement('h6')
  // id.innerHTML = pokData.id
  let pokeTypes = document.createElement('div')
  pokeTypes.classList.add('pokeTypes')
  createPokeImage(pokData, pokContainer)
  createTypes(pokData.types, pokeTypes) 
  pokContainer.append(name,pokeTypes, id)
  mainContainer.appendChild(pokContainer) 
}

function createTypes(types, div){
  types.forEach(function(type){
  let typeLi = document.createElement('span');
  typeLi.innerText = type['type']['name'];
  typeLi.setAttribute('id',type['type']['name'])
  div.append(typeLi)
  })
}

function createPokeImage(pokeID, containerDiv){
  let pokeImage = document.createElement('img')
  pokeImage.src = pokeID.sprites.front_default;
  
  containerDiv.append(pokeImage);
}

const loadPokems = () => {
  pokemonList(num+12);
}

document.addEventListener('DOMContentLoaded', () => {
  const loadBtn = document.querySelector('.load');
  loadBtn.addEventListener('click',loadPokems);
})


  


function infoPokem() {
  let id = event.srcElement.id;
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`
  fetch(url)
  .then(response => response.json())
  .then(function(pokData) {
    getParams(pokData)
  })
};

function getParams(data) {
  let card = document.querySelector('.pok_info')
  card.style.opacity = '1'
  let img = document.querySelector('.info-img')
  img.src = data.sprites.front_default;
  let name = document.querySelector('.info-name')
  name.innerHTML = data.species['name'];
  let id = document.querySelector('.id')
  id.innerHTML = `#0${data.id}`;
  let types = document.querySelector('.type-val')
  types.innerHTML = data.types[0]['type']['name'];
  let attack = document.querySelector('.attack-val')
  attack.innerHTML = data.stats[4].base_stat;
  let defence = document.querySelector('.deffence-val')
  defence.innerHTML = data.stats[3].base_stat;
  let hp =document.querySelector('.HP-val')
  hp.innerHTML = data.stats[5].base_stat;
  let spAttack = document.querySelector('.spAttack-val')
  spAttack.innerHTML = data.stats[2].base_stat;
  let spDefence = document.querySelector('.spDefence-val')
  spDefence.innerHTML = data.stats[1].base_stat;
  let speed = document.querySelector('.speed-val')
  speed.innerHTML = data.stats[4].base_stat;
  let weight = document.querySelector('.weight-val')
  weight.innerHTML = data.weight;
  let moves = document.querySelector('.move-val')
  moves.innerHTML = data.moves.length;
  console.log(document.documentElement.id)
};

function filter() {
  let x = document.getElementsByClassName("pokContainer");
  for (let i = 0; i<x.length; i++){
    x[i].style.display = 'flex'
    if(x[i].getAttribute('data') !== 'poison'){
      x[i].style.display = 'none'
    }
  }
};

function filterFire() {
  let x = document.getElementsByClassName("pokContainer");
  for (let i = 0; i<x.length; i++){
    x[i].style.display = 'flex'
    if(x[i].getAttribute('data') !== 'fire'){
      x[i].style.display = 'none'
    }
  }
};

function showAll() {
  let x = document.getElementsByClassName("pokContainer");
  for (let i = 0; i<x.length; i++){
    x[i].style.display = 'flex'
  }
}

